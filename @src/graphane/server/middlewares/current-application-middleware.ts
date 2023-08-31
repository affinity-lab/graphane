import {NextFunction, Request, Response} from "express";
import {CurrentApplication} from "../../application/current-application";


export function currentApplicationMiddleware(currentApplication: CurrentApplication, fail: boolean = true) {
	if (fail) {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			await currentApplication.fetch(req);
			currentApplication.fail.get(req);
			next();
		};
	}
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		await currentApplication.fetch(req);
		next();
	};
}
