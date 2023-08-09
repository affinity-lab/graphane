"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const datasource_manager_1 = require("../util/datasource-manager");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
async function createApolloServer(schema, gqlConfig, start = true) {
    let server = new server_1.ApolloServer({
        schema,
        plugins: [(0, type_graphql_dataloader_1.ApolloServerLoaderPlugin)({ typeormGetConnection: datasource_manager_1.getDataSource })],
        includeStacktraceInErrorResponses: gqlConfig.includeStacktraceInErrorResponses,
        introspection: gqlConfig.introspection
    });
    if (start) {
        await server.start();
    }
    return server;
}
exports.default = createApolloServer;
