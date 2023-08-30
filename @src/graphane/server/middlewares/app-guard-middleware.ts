import {NextFunction, Request, Response} from "express";
import {CurrentApplication} from "../../application/current-application";
import {fatalError} from "../../../error/fatal-error";


export function appGuardMiddleware(currentApplication: CurrentApplication) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		if (currentApplication.get(req) === undefined) throw fatalError("Application missing from request or invalid");
		next();
	};
}
