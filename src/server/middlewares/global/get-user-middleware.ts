import Application from "../../../application/application";
import Authorizable from "../../../application/authorizable";
import {NextFunction, Request, Response} from "express";


export default function getUserMiddleware(authorize?: ((req: Request) => Promise<Authorizable | undefined>)) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		let app: Application | undefined = req.context.get("app");
		let authorized: Authorizable | undefined = undefined;
		if (authorize !== undefined) authorized = await authorize(req);
		if (authorized === undefined) authorized = await app?.authorize(req);
		req.context.set("authorized", authorized);
		return next();
	};
}
