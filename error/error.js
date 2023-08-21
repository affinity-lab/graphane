"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snake_case_1 = require("snake-case");
const index_1 = require("graphql/index");
function error(info, message, status = 500, silent = false) {
    const error = { status, silent };
    if (typeof info !== "undefined")
        error.info = info;
    if (typeof message !== "undefined")
        error.message = message;
    return error;
}
exports.default = error;
error.preprocess = (errors, prefix = "") => {
    const props = Object.getOwnPropertyNames(errors);
    for (const prop of props) {
        if (typeof errors[prop] === "object") {
            error.preprocess(errors[prop], prefix + "_" + prop);
        }
        else if (typeof errors[prop] === "function") {
            const originalMethod = errors[prop];
            const code = (0, snake_case_1.snakeCase)(prefix + "_" + prop).toUpperCase();
            errors[prop] = (...args) => {
                const graphane = { info: null, code, message: code, ...originalMethod(...args) };
                const error = new index_1.GraphQLError(graphane.message);
                error.extensions.graphane = graphane;
                return error;
            };
        }
    }
};
