"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotRenameFileError = void 0;
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class CannotRenameFileError extends BaseError_1.default {
    constructor(filename, newName) {
        super(`Cannot rename ${filename}, ${newName} is already used!`, {
            file: filename,
            newName: newName
        });
    }
}
exports.CannotRenameFileError = CannotRenameFileError;
