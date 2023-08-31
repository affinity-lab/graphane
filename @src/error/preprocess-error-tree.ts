import {snakeCase} from "snake-case";
import {GraphQLError} from "graphql/index";


export class GraphaneException extends GraphQLError {
	extensions: {
		graphane: {
			info?: Record<string, any>,
			message?: string,
			status: number,
			silent: boolean,
			code: string
		}
	};

	get status() {return this.extensions.graphane.status;}
	get errorData() {
		const data = this.extensions.graphane;
		return {
			code: data.code,
			message: data.status ? data.message : "",
			info: data.status ? data.info : {}
		};
	}
}

export function preprocessErrorTree(errors: Record<string, any>, prefix: string = ""): void {
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
}
