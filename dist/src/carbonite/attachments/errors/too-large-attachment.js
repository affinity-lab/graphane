"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class TooLargeAttachment extends BaseError_1.default {
    constructor(catalog, maxFileSize, file, fileSize) {
        super("Too large attachment " + catalog.owner.ident, {
            maxFileSize,
            file,
            fileSize
        });
    }
    ;
}
exports.default = TooLargeAttachment;
