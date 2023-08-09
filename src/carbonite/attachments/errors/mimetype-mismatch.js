"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class MimeTypeMismatch extends BaseError_1.default {
    constructor(catalog, accepted, mimetype) {
        super("Mimetype mismatch " + catalog.owner.ident, {
            accepted,
            mimetype
        });
    }
    ;
}
exports.default = MimeTypeMismatch;
