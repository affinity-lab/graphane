"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloExpressMiddleware = void 0;
const express4_1 = require("@apollo/server/express4");
const create_apollo_server_1 = require("../create-apollo-server");
async function getApolloContext({ req }) {
    return req.context.get("context");
}
async function createApolloExpressMiddleware(schema, gqlConfig, getDataSource) {
    return (0, express4_1.expressMiddleware)(await (0, create_apollo_server_1.createApolloServer)(schema, gqlConfig, getDataSource, true), { context: getApolloContext });
}
exports.createApolloExpressMiddleware = createApolloExpressMiddleware;
