"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleWriter = void 0;
const writer_1 = require("./writer");
class ConsoleWriter extends writer_1.Writer {
    write(formatted) {
        console.log(`${formatted}`);
    }
    ;
}
exports.ConsoleWriter = ConsoleWriter;
