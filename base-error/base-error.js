"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class BaseError extends graphql_1.GraphQLError {
    constructor(message = "", info = {}) {
        super(message);
        this.extensions.graphane = {
            name: this.constructor.name,
            message: message,
            info: info
        };
    }
}
exports.default = BaseError;
