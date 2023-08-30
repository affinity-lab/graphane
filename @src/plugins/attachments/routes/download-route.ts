import express, {Express} from "express";
import {resolveFileLocationMiddleware} from "../middlewares/download/resolve-file-location-middleware";
import {fileNotFoundMiddleware} from "../middlewares/download/file-not-found-middleware";


export function downloadRoute(
	app: Express,
	endpoint: string,
	fileStoragePath: string,
	fileMaxAge: string | number
): void {
	app.use(
		resolveFileLocationMiddleware.route(endpoint),
		express.Router({mergeParams: true}).use(
			resolveFileLocationMiddleware(),
			express.static(fileStoragePath, {maxAge: fileMaxAge}),
			fileNotFoundMiddleware()
		)
	);
}
