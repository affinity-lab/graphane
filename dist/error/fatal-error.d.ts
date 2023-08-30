import { GraphQLError } from "graphql/index";
export default function fatalError(message?: string, info?: Record<string, any>): GraphQLError;
