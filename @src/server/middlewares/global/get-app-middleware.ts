import Application from "../../../application/application";
import {NextFunction, Request, Response} from "express";


export default function getAppMiddleware(guarded: boolean = false, acceptCode: boolean = false) {
	return (
		req: Request,
		res: Response,
		next: NextFunction) => {
		let app: Application | undefined;
		if (acceptCode && req.hasHeader("api-code")) app = Application.get.byCode(req.getHeader("api-code")!);
		if (app === undefined && req.hasHeader("api-key")) app = Application.get.byId(req.getHeader("api-key")!);

		if (guarded && app === undefined) {
			res.setHeader("error", "api-key not found").sendStatus(401);
		} else {
			req.context.set("app", app);
			return next();
		}
	};
}
