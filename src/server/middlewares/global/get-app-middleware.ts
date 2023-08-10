import {NextFunction, Request, Response} from "express";
import Application from "../../../application/application";


export default function getAppMiddleware(guard: boolean = false) {
    return (
        req: Request,
        res: Response,
        next: NextFunction) => {
        let app: Application | undefined;
        if (req.hasHeader("api-key")) {
            app = Application.get.byId(req.getHeader("api-key")!);
        }
        if (guard && !app) {
            res.setHeader("error", "api-guard: api-key not found").sendStatus(401);
        }
        req.context.set("app", app);
        return next();
    };
}
