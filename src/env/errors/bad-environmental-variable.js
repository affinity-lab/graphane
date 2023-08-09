"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../base-error/BaseError"));
class BadEnvironmentalVariable extends BaseError_1.default {
    constructor(key, type) {
        super(`${key} environmental variable must be a(n) ${type}.`, {
            key,
            type
        });
    }
    ;
}
exports.default = BadEnvironmentalVariable;
;