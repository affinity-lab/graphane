"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function error(info, message, status = 500, silent = false) {
    const error = { status, silent };
    if (typeof info !== "undefined") {
        error.info = info;
    }
    if (typeof message !== "undefined") {
        error.message = message;
    }
    return error;
}
exports.default = error;