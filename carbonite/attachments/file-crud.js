"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../../error/graphane-error"));
class FileCrud {
    constructor(entity, jwt) {
        this.entity = entity;
        this.jwt = jwt;
    }
    checkVariablesExist(obj, ...required) {
        if (typeof obj === "undefined")
            throw graphane_error_1.default.attachment.fileCrud.badInput("variables");
        for (const name of required)
            if (typeof obj[name] === "undefined")
                throw graphane_error_1.default.attachment.fileCrud.badInput(name);
    }
    async execute({ command, id, catalog }, variables, context) {
        let catalogInstance = await this.getCatalog(id, catalog);
        switch (command) {
            case "upload":
                return this.jwt.encode({ module: this.entity.module, entity: this.entity.name, id, catalog, user: context.authorizable.id });
            case "delete":
                this.checkVariablesExist(variables, "fileName");
                await catalogInstance.removeFiles(variables.fileName);
                return;
            case "rename":
                this.checkVariablesExist(variables, "fileName", "newName");
                await catalogInstance.renameFile(variables.fileName, variables.newName);
                return;
            case "reorder":
                this.checkVariablesExist(variables, "fileName", "index");
                await catalogInstance.reorderFiles(variables.fileName, variables.index);
                return;
            case "giveTitle":
                this.checkVariablesExist(variables, "fileName", "title");
                await catalogInstance.giveTitleToFile(variables.fileName, variables.title);
                return;
            case "changeImageFocus":
                this.checkVariablesExist(variables, "fileName", "imageFocus");
                await catalogInstance.changeImageFocus(variables.fileName, variables.imageFocus);
                return;
            default:
                throw graphane_error_1.default.attachment.fileCrud.unknownCommand(command);
        }
    }
    async getCatalog(id, catalogName) {
        const catalogInstance = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
        if (typeof catalogInstance === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.badInput("catalog");
        }
        return catalogInstance;
    }
}
exports.default = FileCrud;
