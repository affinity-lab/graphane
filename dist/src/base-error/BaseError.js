"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class BaseError extends graphql_1.GraphQLError {
    constructor(message, info = {}) {
        super(message);
        this.extensions.info = info;
        this.extensions.name = this.constructor.name;
    }
    ;
}
exports.default = BaseError;
;
