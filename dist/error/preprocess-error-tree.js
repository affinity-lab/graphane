"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphaneException = void 0;
const snake_case_1 = require("snake-case");
const index_1 = require("graphql/index");
class GraphaneException extends index_1.GraphQLError {
}
exports.GraphaneException = GraphaneException;
function preprocessErrorTree(errors, prefix = "") {
    const props = Object.getOwnPropertyNames(errors);
    for (const prop of props) {
        if (typeof errors[prop] === "object") {
            preprocessErrorTree(errors[prop], prefix + "_" + prop);
        }
        else if (typeof errors[prop] === "function") {
            const originalMethod = errors[prop];
            const code = (0, snake_case_1.snakeCase)(prefix + "_" + prop).toUpperCase();
            errors[prop] = (...args) => {
                const graphane = { info: null, code, message: code, ...originalMethod(...args) };
                const error = new GraphaneException(graphane.code + ": " + graphane.message);
                error.extensions.graphane = graphane;
                return error;
            };
        }
    }
}
exports.default = preprocessErrorTree;
;
