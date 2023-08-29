import {snakeCase} from "snake-case";
import {GraphQLError} from "graphql/index";


export class GraphaneException extends GraphQLError {}

export default function preprocessErrorTree(errors: { [p: string]: any }, prefix = "") {
	const props = Object.getOwnPropertyNames(errors);
	for (const prop of props) {
		if (typeof errors[prop] === "object") {
			preprocessErrorTree(errors[prop], prefix + "_" + prop);
		} else if (typeof errors[prop] === "function") {
			const originalMethod = errors[prop];
			const code = snakeCase(prefix + "_" + prop).toUpperCase();
			errors[prop] = (...args: Array<any>) => {
				const graphane = {info: null, code, message: code, ...originalMethod(...args)};
				const error = new GraphaneException(graphane.code + ": " + graphane.message);
				error.extensions.graphane = graphane;
				return error;
			};
		}
	}
};