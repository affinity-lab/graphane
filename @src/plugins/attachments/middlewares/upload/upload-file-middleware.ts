import {NextFunction, Request, Response} from "express";
import {AttachmentError} from "../../attachment-error";


const isEligibleRequest = require("express-fileupload/lib/isEligibleRequest");
const processMultipart = require("express-fileupload/lib/processMultipart.js");


export function uploadFileMiddleware(fileUploadConfig: Record<string, any>) {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (!isEligibleRequest(req)) {
			throw AttachmentError.upload.failed("Bad upload request");
		} else {
			processMultipart(fileUploadConfig, req, res, next);
		}
	};
}
