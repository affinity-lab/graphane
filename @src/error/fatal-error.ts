import {GraphQLError} from "graphql/index";
import {GraphaneException} from "./preprocess-error-tree";


export function fatalError(message: string = "fatal error occurred", info: Record<string, any> = {}): GraphQLError {
	const code: string = "FATAL_ERROR";
	const error: GraphaneException = new GraphaneException(code + ": " + message);
	error.extensions.graphane = {
		message,
		code,
		info,
		silent: false,
		status: 500
	};
	return error;
}
