"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = __importDefault(require("./formatter"));
class DefaultFormatter extends formatter_1.default {
    format(message) {
        if (typeof message === "string")
            return message;
        try {
            return JSON.stringify(message);
        }
        catch (e) {
            return "Cannot stringify message to be logged.";
        }
    }
    ;
}
exports.default = DefaultFormatter;
