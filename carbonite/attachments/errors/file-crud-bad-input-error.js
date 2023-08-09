"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCrudBadInputError = void 0;
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class fileCrudBadInputError extends BaseError_1.default {
    constructor(which, variables = false) {
        super(variables ? `A parameter is set to an invalid value: ${which}` : `A variable is set to an invalid value: variables.${which}`, {
            badParam: which,
            fromVariables: variables
        });
    }
    ;
}
exports.fileCrudBadInputError = fileCrudBadInputError;
