import {NextFunction, Request, Response} from "express";
import NotRegisteredAppError from "../../errors/not-registered-app-error";


export default function appGuardMiddleware() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.context.get("app")) {
            throw new NotRegisteredAppError();
        }
        next();
    };
}
