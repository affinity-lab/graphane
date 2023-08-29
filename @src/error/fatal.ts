import {GraphQLError} from "graphql/index";


export default function fatal(message: string = "fatal error occured", info: Record<string, any> = {}): GraphQLError {
	const code = "FATAL_ERROR";
	const error = new GraphQLError(code + ": " + message);
	error.extensions.graphane = {
		message,
		code,
		info,
		silent: false,
		status: 500
	};
	return error;
}