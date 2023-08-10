import {NextFunction, Request, Response} from "express";
import Application from "../../../application/application";
import Authorizable from "../../../application/auth/authorizable";


export default function getUserMiddleware() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let app: Application | undefined = req.context.get("app");
        let authorized: Authorizable | undefined = await app?.authorize(req);
        req.context.set("authorized", authorized);
        return next();
    };
}
