"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class TooManyAttachments extends BaseError_1.default {
    constructor(catalog, maxFileCount) {
        super("Too many attachments " + catalog.owner.ident, {
            maxFileCount
        });
    }
    ;
}
exports.default = TooManyAttachments;
