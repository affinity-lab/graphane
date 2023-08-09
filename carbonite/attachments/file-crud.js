"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_upload_token_1 = require("../../server/create-upload-token");
const file_crud_bad_input_error_1 = require("./errors/file-crud-bad-input-error");
const unknown_file_command_error_1 = require("./errors/unknown-file-command-error");
class FileCrud {
    constructor(entity, uploadTokenKey) {
        this.entity = entity;
        this.uploadTokenKey = uploadTokenKey;
    }
    ;
    checkVariablesExist(variables) {
        if (typeof variables === "undefined") {
            throw new file_crud_bad_input_error_1.fileCrudBadInputError("variables");
        }
        if (typeof variables.fileName === "undefined") {
            throw new file_crud_bad_input_error_1.fileCrudBadInputError("fileName");
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
                    throw new file_crud_bad_input_error_1.fileCrudBadInputError("newName");
                }
                await catalogInstance.renameFile(variables.fileName, variables.newName);
                return;
            case "reorder":
                this.checkVariablesExist(variables);
                if (typeof variables.index === "undefined") {
                    throw new file_crud_bad_input_error_1.fileCrudBadInputError("index");
                }
                await catalogInstance.reorderFiles(variables.fileName, variables.index);
                return;
            case "giveTitle":
                this.checkVariablesExist(variables);
                if (typeof variables.title === "undefined") {
                    throw new file_crud_bad_input_error_1.fileCrudBadInputError("title");
                }
                await catalogInstance.giveTitleToFile(variables.fileName, variables.title);
                return;
            case "changeImageFocus":
                this.checkVariablesExist(variables);
                if (typeof variables.imageFocus === "undefined") {
                    throw new file_crud_bad_input_error_1.fileCrudBadInputError("imageFocus");
                }
                await catalogInstance.changeImageFocus(variables.fileName, variables.imageFocus);
                return;
            default:
                throw new unknown_file_command_error_1.UnknownFileCommandError(command, this.entity, id, catalog, variables);
        }
    }
    ;
    async getCatalog(id, catalogName) {
        const catalogInstance = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
        if (typeof catalogInstance === "undefined") {
            throw new file_crud_bad_input_error_1.fileCrudBadInputError("catalog");
        }
        return catalogInstance;
    }
    ;
}
exports.default = FileCrud;
