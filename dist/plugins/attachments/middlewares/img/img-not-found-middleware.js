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
exports.imgNotFoundMiddleware = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
function imgNotFoundMiddleware(fileStoragePath, imgStoragePath) {
    return async (req, res) => {
        let b36 = parseInt(req.params["id"]).toString(36).padStart(6, "0");
        const inp = `/${req.params["module"]}/${req.params["entity"]}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${req.params["catalog"]}/${req.params["file"]}.${req.params["originalExt"]}`;
        if (fs.existsSync(path_1.default.resolve(fileStoragePath, inp))) {
            res.sendStatus(404);
            return;
        }
        sharp_1.default.cache({ files: 0 });
        let img = (0, sharp_1.default)(fileStoragePath + inp);
        let meta = await Promise.all([img.metadata(), img.stats()])
            .then((res) => ({ meta: res[0], stats: res[1] }));
        let width = parseInt(req.params["width"]);
        let height = parseInt(req.params["height"]);
        let oWidth = meta.meta.width;
        let oHeight = meta.meta.height;
        if (oWidth < width) {
            height = Math.floor(height * oWidth / width);
            width = oWidth;
        }
        if (oHeight < height) {
            width = Math.floor(width * oHeight / height);
            height = oHeight;
        }
        // TODO: SymLink if there's already a pic in the required dimensions
        await (0, sharp_1.default)(fileStoragePath + inp, { animated: true })
            .resize(width, height, {
            kernel: sharp_1.default.kernel.lanczos3,
            fit: "cover",
            position: req.params["focus"],
            withoutEnlargement: true
        })
            .toFile(imgStoragePath + "/" + req.url);
        res.sendFile(path_1.default.resolve(imgStoragePath + "/" + req.url));
    };
}
exports.imgNotFoundMiddleware = imgNotFoundMiddleware;
