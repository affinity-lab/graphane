"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFormatter = void 0;
const formatter_1 = require("./formatter");
class DefaultFormatter extends formatter_1.Formatter {
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
exports.DefaultFormatter = DefaultFormatter;
