import Application from "../../../application/application";
import {NextFunction, Request, Response} from "express";
import {Logger} from "../../service-interfaces/service-interfaces";


export default function exceptionHandler(mainLogger: Logger) {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			next();
		} catch (e) {
			const app: Application | undefined = req.context.get("app");
			if (typeof app == "undefined") {
				mainLogger.error(e);
			} else {
				app.logger?.error(e);
			}
			res.status(400).send(e);
		}
	};
}
