import {NextFunction, Request, Response} from "express";
import {CurrentAuthorized} from "./current-authorized";


export function currentAuthorizedMiddleware(currentAuthorized: CurrentAuthorized) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		await currentAuthorized.fetch(req);
		next();
	};
}
