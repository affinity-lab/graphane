"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../../base-error/BaseError"));
class BadAttachmentTypeError extends BaseError_1.default {
    constructor(expected, received) {
        super(`Expected attachment type of ${expected} but received ${received}`, {
            expected: expected,
            received: received
        });
    }
}
exports.default = BadAttachmentTypeError;
