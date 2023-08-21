import { ApolloServer } from "@apollo/server";
import { GraphQLSchema } from "graphql/type/schema";
import { Context } from "./context";
import { DataSource } from "typeorm";
export default function createApolloServer(schema: GraphQLSchema, gqlConfig: Record<string, any>, getDataSource: () => DataSource, start?: boolean): Promise<ApolloServer<Context>>;
