"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../base-error/BaseError"));
class BadRelationTypeError extends BaseError_1.default {
    constructor(rel) {
        super(`Cannot resolve relation type for relation: ${rel}`, {
            relation: rel
        });
    }
    ;
}
exports.default = BadRelationTypeError;
