"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fatalError = void 0;
const preprocess_error_tree_1 = require("./preprocess-error-tree");
function fatalError(message = "fatal error occurred", info = {}) {
    const code = "FATAL_ERROR";
    const error = new preprocess_error_tree_1.GraphaneException(code + ": " + message);
    error.extensions.graphane = {
        message,
        code,
        info,
        silent: false,
        status: 500
    };
    return error;
}
exports.fatalError = fatalError;
