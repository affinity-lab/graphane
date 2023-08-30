"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fatalError = void 0;
const index_1 = require("graphql/index");
function fatalError(message = "fatal error occurred", info = {}) {
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
exports.fatalError = fatalError;
