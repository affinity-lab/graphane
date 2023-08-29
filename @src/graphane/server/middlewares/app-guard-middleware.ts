import {NextFunction, Request, Response} from "express";
import CurrentApplication from "../../application/current-application";
import fatal from "../../../error/fatal";


export default function appGuardMiddleware(currentApplication: CurrentApplication) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		if (currentApplication.get(req) === undefined) throw fatal("Application missing from request or invalid");
		next();
	};
}
