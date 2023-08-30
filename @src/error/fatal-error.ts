import {GraphQLError} from "graphql/index";


export default function fatalError(message: string = "fatal error occurred", info: Record<string, any> = {}): GraphQLError {
	const code: string = "FATAL_ERROR";
	const error: GraphQLError = new GraphQLError(code + ": " + message);
	error.extensions.graphane = {
		message,
		code,
		info,
		silent: false,
		status: 500
	};
	return error;
}
