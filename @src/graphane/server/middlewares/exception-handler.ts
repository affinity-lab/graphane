import {NextFunction, Request, Response} from "express";
import {Logger} from "../../service-interfaces";
import {CurrentApplication} from "../../application/current-application";
import process from "process";


export function exceptionHandler(mainLogger: Logger, currentApplication: CurrentApplication) {
	return (req: Request, res: Response, next: NextFunction): void => {
		process.on("uncaughtException", (e) => console.log(e));
		try {
			next();
		} catch (e) {
			const app = currentApplication.get(req);
			if (app === undefined || app.logger === undefined) mainLogger.error(e);
			else app.logger.error(e);
			res.status(400).send(e);
		}
	};
}
