"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../../error/graphane-error"));
const create_upload_token_1 = require("../../server/create-upload-token");
class FileCrud {
    constructor(entity, uploadTokenKey) {
        this.entity = entity;
        this.uploadTokenKey = uploadTokenKey;
    }
    ;
    checkVariablesExist(variables) {
        if (typeof variables === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.badInput("variables");
        }
        if (typeof variables.fileName === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.badInput("fileName");
        }
    }
    ;
    async execute({ command, id, catalog }, variables, context) {
        let catalogInstance = await this.getCatalog(id, catalog);
        switch (command) {
            case "upload":
                return (0, create_upload_token_1.createUploadToken)(this.entity, id, catalog, context.authorizable, this.uploadTokenKey);
            case "delete":
                this.checkVariablesExist(variables);
                await catalogInstance.removeFiles(variables.fileName);
                return;
            case "rename":
                this.checkVariablesExist(variables);
                if (typeof variables.newName === "undefined") {
                    throw graphane_error_1.default.attachment.fileCrud.badInput("newName");
                }
                await catalogInstance.renameFile(variables.fileName, variables.newName);
                return;
            case "reorder":
                this.checkVariablesExist(variables);
                if (typeof variables.index === "undefined") {
                    throw graphane_error_1.default.attachment.fileCrud.badInput("index");
                }
                await catalogInstance.reorderFiles(variables.fileName, variables.index);
                return;
            case "giveTitle":
                this.checkVariablesExist(variables);
                if (typeof variables.title === "undefined") {
                    throw graphane_error_1.default.attachment.fileCrud.badInput("title");
                }
                await catalogInstance.giveTitleToFile(variables.fileName, variables.title);
                return;
            case "changeImageFocus":
                this.checkVariablesExist(variables);
                if (typeof variables.imageFocus === "undefined") {
                    throw graphane_error_1.default.attachment.fileCrud.badInput("imageFocus");
                }
                await catalogInstance.changeImageFocus(variables.fileName, variables.imageFocus);
                return;
            default:
                throw graphane_error_1.default.attachment.fileCrud.unknownCommand(command);
        }
    }
    ;
    async getCatalog(id, catalogName) {
        const catalogInstance = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
        if (typeof catalogInstance === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.badInput("catalog");
        }
        return catalogInstance;
    }
    ;
}
exports.default = FileCrud;
