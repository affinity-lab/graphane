import {snakeCase} from "snake-case";
import {GraphQLError} from "graphql/index";


export default function preprocessErrorTree(errors: Record<string, any>, prefix: string = ""): void {
	for (const prop of Object.getOwnPropertyNames(errors)) {
		if (typeof errors[prop] === "object") {
			preprocessErrorTree(errors[prop], prefix + "_" + prop);
		} else if (typeof errors[prop] === "function") {
			const originalMethod = errors[prop];
			const code: string = snakeCase(prefix + "_" + prop).toUpperCase();
			errors[prop] = (...args: Array<any>) => {
				const graphane = {info: null, code, message: code, ...originalMethod(...args)};
				const error: GraphQLError = new GraphQLError(graphane.code + ": " + graphane.message);
				error.extensions.graphane = graphane;
				return error;
			};
		}
	}
};
