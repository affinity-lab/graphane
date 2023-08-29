export default function error(info?: { [p: string]: any }, message?: string, status: number = 500, silent: boolean = false) {
	const error: { info?: { [p: string]: any }, message?: string, status: number, silent: boolean } = {status, silent};
	if (typeof info !== "undefined") {
		error.info = info;
	}
	if (typeof message !== "undefined") {
		error.message = message;
	}
	return error;
}
