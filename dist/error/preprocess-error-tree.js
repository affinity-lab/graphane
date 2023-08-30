"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snake_case_1 = require("snake-case");
const index_1 = require("graphql/index");
function preprocessErrorTree(errors, prefix = "") {
    for (const prop of Object.getOwnPropertyNames(errors)) {
        if (typeof errors[prop] === "object") {
            preprocessErrorTree(errors[prop], prefix + "_" + prop);
        }
        else if (typeof errors[prop] === "function") {
            const originalMethod = errors[prop];
            const code = (0, snake_case_1.snakeCase)(prefix + "_" + prop).toUpperCase();
            errors[prop] = (...args) => {
                const graphane = { info: null, code, message: code, ...originalMethod(...args) };
                const error = new index_1.GraphQLError(graphane.code + ": " + graphane.message);
                error.extensions.graphane = graphane;
                return error;
            };
        }
    }
}
exports.default = preprocessErrorTree;
;
