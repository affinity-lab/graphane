import {NextFunction, Request, Response} from "express";
import {Logger} from "../../service-interfaces";
import {CurrentApplication} from "../../application/current-application";
import {GraphaneException} from "../../../error/preprocess-error-tree";
import {Application} from "../../application/application";


export function exceptionHandler(mainLogger: Logger, currentApplication: CurrentApplication) {
	return (error: Error, req: Request, res: Response, next: NextFunction): void => {
		const app: Application | undefined = currentApplication.get(req);
		if (app?.logger !== undefined) app.logger.error(error);
		else mainLogger.error(error);
		if (error instanceof GraphaneException) {
			res.status(error.status);
			res.json(error.errorData);
		} else {
			res.status(500);
			res.json({error: error.message});
		}
		next();
	};
}
