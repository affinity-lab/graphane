import {NextFunction, Request, Response} from "express";
import {CurrentApplication} from "../../application/current-application";


export function appGuardMiddleware(currentApplication: CurrentApplication) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		await currentApplication.fetch(req);
		currentApplication.fail.get(req);
		next();
	};
}
