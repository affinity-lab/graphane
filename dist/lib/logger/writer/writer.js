"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
class Writer {
    constructor(level = logger_1.LOGLEVEL.DEBUG) {
        this.level = level;
    }
}
exports.default = Writer;
