import { ApolloServer } from "@apollo/server";
import { GraphQLSchema } from "graphql/type/schema";
import { Context } from "./context";
export default function createApolloServer(schema: GraphQLSchema, gqlConfig: Record<string, any>, start?: boolean): Promise<ApolloServer<Context>>;
