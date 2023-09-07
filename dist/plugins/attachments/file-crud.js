"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCrud = void 0;
const attachment_error_1 = require("./attachment-error");
class FileCrud {
    constructor(entity, jwt, currentAuthorized) {
        this.entity = entity;
        this.jwt = jwt;
        this.currentAuthorized = currentAuthorized;
    }
    ;
    checkVariablesExist(obj, ...required) {
        if (typeof obj === "undefined")
            throw attachment_error_1.AttachmentError.fileCrud.badInput("variables");
        for (const name of required)
            if (typeof obj[name] === "undefined")
                throw attachment_error_1.AttachmentError.fileCrud.badInput(name);
    }
    ;
    async execute({ command, id, catalog }, variables, context) {
        let catalogInstance = await this.getCatalog(id, catalog);
        switch (command) {
            case "upload":
                return this.jwt.encode({ module: this.entity.module, entity: this.entity.name, id, catalog, user: this.currentAuthorized.fail.id(context.request) });
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
                throw attachment_error_1.AttachmentError.fileCrud.unknownCommand(command);
        }
    }
    ;
    async getCatalog(id, catalogName) {
        const catalogInstance = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
        if (typeof catalogInstance === "undefined")
            throw attachment_error_1.AttachmentError.fileCrud.badInput("catalog");
        return catalogInstance;
    }
    ;
}
exports.FileCrud = FileCrud;
