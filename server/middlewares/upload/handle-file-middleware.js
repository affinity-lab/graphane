"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(require("../../../application/module"));
const atom_1 = require("../../../carbonite/atom");
const graphane_error_1 = __importDefault(require("../../../error/graphane-error"));
const fs = __importStar(require("fs"));
function handleFileMiddleware() {
    return async (req, res) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw graphane_error_1.default.upload.failed("Unsuccessful file upload");
        }
        const token = req.context.get("uploadTokenPayload");
        const entityType = module_1.default.get(token.module)?.entities[token.entity];
        if (typeof entityType === "undefined") {
            throw graphane_error_1.default.upload.failed(`Upload to not existing entityType: ${token.module}/${token.entity}`);
        }
        if (!(entityType.prototype instanceof atom_1.AtomWithAttachments)) {
            throw graphane_error_1.default.upload.failed(`Upload to entity with no attachments: ${entityType.Ident}`);
        }
        const withAttachments = entityType;
        const entity = await withAttachments.findOneBy({ id: token.id });
        if (entity == null) {
            throw graphane_error_1.default.upload.failed(`Upload to not existing entity: ${entityType.Ident}#${token.id}`);
        }
        let file;
        const catalog = entity.getCatalog(token.catalog);
        if (typeof catalog === "undefined") {
            throw graphane_error_1.default.upload.failed(`Entity: ${entity.ident} has no Catalog: ${token.catalog}`);
        }
        for (let key in req.files) {
            file = req.files[key];
            fs.mkdirSync(file.tempFilePath + "-dir");
            fs.renameSync(file.tempFilePath, file.tempFilePath + "-dir/" + file.name);
            await catalog.addFiles(file.tempFilePath + "-dir/" + file.name);
            fs.readdirSync(file.tempFilePath + "-dir").forEach(f => fs.unlinkSync(file.tempFilePath + "-dir/" + f));
            fs.rmdirSync(file.tempFilePath + "-dir");
        }
        res.sendStatus(200);
    };
}
exports.default = handleFileMiddleware;
