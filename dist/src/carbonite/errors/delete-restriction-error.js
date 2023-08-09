"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../base-error/BaseError"));
class DeleteRestrictionError extends BaseError_1.default {
    constructor(host, related) {
        super(`Cannot delete ${host.name} while it is associated with a(n) ${related.name}.`, {
            host,
            related
        });
    }
    ;
}
exports.default = DeleteRestrictionError;
