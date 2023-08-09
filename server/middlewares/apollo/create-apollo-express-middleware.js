"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express4_1 = require("@apollo/server/express4");
const create_apollo_server_1 = __importDefault(require("../../create-apollo-server"));
async function getApolloContext({ req }) {
    return req.context.get("context");
}
async function createApolloExpressMiddleware(schema, gqlConfig) {
    return (0, express4_1.expressMiddleware)(await (0, create_apollo_server_1.default)(schema, gqlConfig, true), { context: getApolloContext });
}
exports.default = createApolloExpressMiddleware;
