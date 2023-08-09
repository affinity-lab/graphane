import express from "express";
import { GraphQLSchema } from "graphql/type/schema";
export default function createApolloExpressMiddleware(schema: GraphQLSchema, gqlConfig: Record<string, any>): Promise<express.RequestHandler>;
