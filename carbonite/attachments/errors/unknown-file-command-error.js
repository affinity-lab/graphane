"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownFileCommandError = void 0;
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class UnknownFileCommandError extends BaseError_1.default {
    constructor(command, entity, id, catalog, variables) {
        super(`Unknown command: ${command}`, {
            command,
            entity,
            id,
            catalog,
            variables
        });
    }
    ;
}
exports.UnknownFileCommandError = UnknownFileCommandError;
