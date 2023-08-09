import {GraphQLError} from "graphql";


export default class BaseError extends GraphQLError {
    constructor(message: string, info: Record<any, any> = {}) {
        super(message);
        this.extensions.info = info;
        this.extensions.name = this.constructor.name;
    };
};
