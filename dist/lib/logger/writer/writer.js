"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
const logger_1 = require("../logger");
class Writer {
    constructor(level = logger_1.LOGLEVEL.DEBUG) {
        this.level = level;
    }
    ;
}
exports.Writer = Writer;
