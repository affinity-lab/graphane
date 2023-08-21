import {ApolloServer} from "@apollo/server";
import {GraphQLSchema} from "graphql/type/schema";
import {ApolloServerLoaderPlugin} from "type-graphql-dataloader";
import {Context} from "./context";
import {DataSource} from "typeorm";


export default async function createApolloServer(schema: GraphQLSchema, gqlConfig: Record<string, any>, getDataSource: ()=>DataSource, start: boolean = true): Promise<ApolloServer<Context>> {
    let server: ApolloServer<Context> = new ApolloServer<Context>({
        schema,
        plugins: [ApolloServerLoaderPlugin({typeormGetConnection: getDataSource})],
        includeStacktraceInErrorResponses: gqlConfig.includeStacktraceInErrorResponses,
        introspection: gqlConfig.introspection
    });
    if (start) {
        await server.start();
    }
    return server;
}
