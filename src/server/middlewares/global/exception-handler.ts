import {NextFunction, Request, Response} from "express";
import Application from "../../../application/application";
import LoggerInterface from "../../../application/loggerInteface";


export default function exceptionHandler(mainLogger: LoggerInterface) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            next();
        } catch (e) {
            const app: Application | undefined = req.context.get("app");
            if (typeof app == "undefined") mainLogger.error(e);
            else app.logger?.error(e);
            res.status(400).send(e);
        }
    };
}
