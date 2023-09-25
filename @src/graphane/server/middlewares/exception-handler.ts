import {NextFunction, Request, Response} from "express";
import {Logger} from "../../service-interfaces";
import {CurrentApplication} from "../../application/current-application";
import {GraphaneException} from "../../../error/preprocess-error-tree";
import {Application} from "../../application/application";


export function exceptionHandler(mainLogger: Logger, currentApplication: CurrentApplication) {
	return async (error: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
		const app: Application | undefined = await currentApplication.fetch(req);
		if (error instanceof GraphaneException) {
			if (app?.logger !== undefined) app.logger.debug(error);
			else mainLogger.debug(error);
			res.status(error.status);
			res.json(error.errorData);
		} else {
			if (app?.logger !== undefined) app.logger.error(error);
			else mainLogger.error(error);
			res.status(500);
			res.json({error: error.message});
		}
		next();
	};
}
