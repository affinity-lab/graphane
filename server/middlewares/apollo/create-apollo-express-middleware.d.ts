import express from "express";
import { GraphQLSchema } from "graphql/type/schema";
import { DataSource } from "typeorm";
export default function createApolloExpressMiddleware(schema: GraphQLSchema, gqlConfig: Record<string, any>, getDataSource: () => DataSource): Promise<express.RequestHandler>;
