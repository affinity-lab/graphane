import { ApolloServer } from "@apollo/server";
import { GraphQLSchema } from "graphql/type/schema";
import { DataSource } from "typeorm";
import { Context } from "./context";
export declare function createApolloServer(schema: GraphQLSchema, gqlConfig: Record<string, any>, getDataSource: () => DataSource, start?: boolean): Promise<ApolloServer<Context>>;
