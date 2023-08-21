import LoggerInterface from "../../../application/loggerInteface";
import {NextFunction, Request, Response} from "express";


const isEligibleRequest = require("express-fileupload/lib/isEligibleRequest");
const processMultipart = require("express-fileupload/lib/processMultipart.js");


export default function uploadFileMiddleware(logger: LoggerInterface, fileUploadConfig: Record<string, any>) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!isEligibleRequest(req)) {
            logger.notice({req, msg: "Bad upload request"});
            res.status(400).json("Bad upload request");
        } else {
            processMultipart(fileUploadConfig, req, res, next);
        }
    };
}
