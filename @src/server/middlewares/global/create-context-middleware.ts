import {NextFunction, Request, Response} from "express";
import Application from "../../../application/application";
import {Context} from "../../context";


export default function createContextMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
        let app: Application = req.context.get("app");
        let context: Context = new Context(app, req.context.get("authorized"), req);
        req.context.set("context", context);
        return next();
    };
}
