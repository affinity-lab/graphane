"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
async function createApolloServer(schema, gqlConfig, getDataSource, start = true) {
    let server = new server_1.ApolloServer({
        schema,
        plugins: [(0, type_graphql_dataloader_1.ApolloServerLoaderPlugin)({ typeormGetConnection: getDataSource })],
        includeStacktraceInErrorResponses: gqlConfig.includeStacktraceInErrorResponses,
        introspection: gqlConfig.introspection
    });
    if (start) {
        await server.start();
    }
    return server;
}
exports.default = createApolloServer;
