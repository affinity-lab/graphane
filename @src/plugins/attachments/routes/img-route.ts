import express, {Express} from "express";
import {resolveImgLocationMiddleware} from "../middlewares/img/resolve-img-location-middleware";
import {imgNotFoundMiddleware} from "../middlewares/img/img-not-found-middleware";


export function imgDownloadRoute(
	exp: Express,
	endpoint: string,
	fileStoragePath: string,
	imgStoragePath: string,
	imgMaxAge: string | number
): void {
	exp.use(
		resolveImgLocationMiddleware.route(endpoint),
		express.Router({mergeParams: true}).use(
			resolveImgLocationMiddleware(imgStoragePath),
			express.static(imgStoragePath, {maxAge: imgMaxAge}),
			imgNotFoundMiddleware(fileStoragePath, imgStoragePath)
		)
	);
}
