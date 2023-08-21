import Application from "@src/application/application";
import LoggerInterface from "@src/application/loggerInteface";
import {NextFunction, Request, Response} from "express";


export default function exceptionHandler(mainLogger: LoggerInterface) {
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
