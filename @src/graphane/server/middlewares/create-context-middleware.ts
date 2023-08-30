import {NextFunction, Request, Response} from "express";
import {Context} from "../context";


export function createContextMiddleware() {
	return (req: Request, res: Response, next: NextFunction): void => {
		let context: Context = new Context(req);
		req.context.set("context", context);
		return next();
	};
}
