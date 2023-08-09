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
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
class FileStorage {
    constructor(path) {
        this.path = path;
        fs.mkdirSync(path, { recursive: true });
    }
    ;
    async purge(catalog) {
        await Promise.all(this.ls(catalog).map((item) => {
            return new Promise((resolve) => {
                fs.realpath(item, (err, resolvedPath) => {
                    if (err) {
                        throw err;
                    }
                    fs.unlink(resolvedPath, (err) => {
                        if (err) {
                            throw err;
                        }
                        resolve();
                    });
                });
            });
        }));
        this.removeStructure(this.getPath(catalog));
    }
    ;
    addFile(catalog, file) {
        fs.copyFileSync(file.file, this.getPath(catalog) + file.name);
    }
    ;
    removeFile(catalog, file) {
        fs.unlinkSync(this.getPath(catalog) + file.name);
    }
    ;
    ls(catalog) {
        return fs.readdirSync(this.getPath(catalog));
    }
    ;
    removeStructure(dir) {
        let parent = path_1.default.parse(dir).dir;
        let list = fs.readdirSync(dir);
        if (list.length === 0) {
            fs.rmdirSync(dir);
            this.removeStructure(parent);
        }
    }
    ;
    getPath(catalog) {
        let b36 = catalog.owner.id.toString(36).padStart(6, "0");
        let path = `${this.path}/${catalog.module}/${catalog.entity}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${catalog.name}/`;
        fs.mkdirSync(path, { recursive: true });
        return path;
    }
    ;
}
exports.default = FileStorage;
