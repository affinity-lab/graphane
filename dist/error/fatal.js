"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("graphql/index");
function fatal(message = "fatal error occurred", info = {}) {
    const code = "FATAL_ERROR";
    const error = new index_1.GraphQLError(code + ": " + message);
    error.extensions.graphane = {
        message,
        code,
        info,
        silent: false,
        status: 500
    };
    return error;
}
exports.default = fatal;
