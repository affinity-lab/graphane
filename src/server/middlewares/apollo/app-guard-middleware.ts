import GraphaneError from "@src/error/graphane-error";
import {NextFunction, Request, Response} from "express";


export default function appGuardMiddleware() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.context.get("app")) {
            throw GraphaneError.application.notFound();
        }
        next();
    };
}
