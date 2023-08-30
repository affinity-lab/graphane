import {expressMiddleware} from "@apollo/server/express4";
import express from "express";
import {GraphQLSchema} from "graphql/type/schema";
import {DataSource} from "typeorm";
import {Context} from "../context";
import {createApolloServer} from "../create-apollo-server";


async function getApolloContext({req}: {
	req: express.Request
}): Promise<Context> {
	return req.context.get("context");
}

export async function createApolloExpressMiddleware(schema: GraphQLSchema, gqlConfig: Record<string, any>, getDataSource: () => DataSource): Promise<express.RequestHandler> {
	return expressMiddleware(await createApolloServer(schema, gqlConfig, getDataSource, true), {context: getApolloContext});
}
