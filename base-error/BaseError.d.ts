import { GraphQLError } from "graphql";
export default class BaseError extends GraphQLError {
    constructor(message?: string, info?: Record<string, any>);
}
