import {GraphQLError} from "graphql/index";
import {snakeCase} from "snake-case";


export default function error(info?: {[p: string]: any}, message?: string, status: number = 500, silent: boolean = false) {
    const error: {info?: {[p: string]: any}, message?: string, status: number, silent: boolean} = {status, silent};
    if (typeof info !== "undefined") {
        error.info = info;
    }
    if (typeof message !== "undefined") {
        error.message = message;
    }
    return error;
}

error.preprocess = (errors: {[p: string]: any}, prefix = "") => {
    const props = Object.getOwnPropertyNames(errors);
    for (const prop of props) {
        if (typeof errors[prop] === "object") {
            error.preprocess(errors[prop], prefix + "_" + prop);
        } else if (typeof errors[prop] === "function") {
            const originalMethod = errors[prop];
            const code = snakeCase(prefix + "_" + prop).toUpperCase();
            errors[prop] = (...args: Array<any>) => {
                const graphane = {info: null, code, message: code, ...originalMethod(...args)};
                const error = new GraphQLError(graphane.code+": "+graphane.message);
                error.extensions.graphane = graphane;
                return error;
            };
        }
    }
};