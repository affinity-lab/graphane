"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class FileDoesNotExistError extends BaseError_1.default {
    constructor(entity, catalog, fileName) {
        super(`${entity.ident} does not have the requested file: ${fileName}.`, {
            entity,
            catalog,
            fileName
        });
    }
    ;
}
exports.default = FileDoesNotExistError;
