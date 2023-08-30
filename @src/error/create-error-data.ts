type errorType = {info?: Record<string, any>, message?: string, status: number, silent: boolean};

export function createErrorData(info?: Record<string, any>, message?: string, status: number = 500, silent: boolean = false): errorType {
	const error: errorType = {status, silent};
	if (typeof info !== "undefined") {
		error.info = info;
	}
	if (typeof message !== "undefined") {
		error.message = message;
	}
	return error;
}
