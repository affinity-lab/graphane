import {NextFunction, Request, Response} from "express";
import {UploadTokenPayload} from "../../upload-token-payload";
import {Jwt} from "../../service-interfaces";
import {AttachmentError} from "../../attachment-error";
import {CurrentAuthorized} from "../../../auth/current-authorized";


export function checkFileTokenMiddleware(jwt: Jwt<UploadTokenPayload>, currentAuthorized: CurrentAuthorized) {
	return (req: Request, res: Response, next: NextFunction): void => {
		const payload: UploadTokenPayload | undefined = jwt.decode(req.getHeader("file-token"));
		if (typeof payload !== "undefined" && payload.user === currentAuthorized.fail.id(req)) {
			req.context.set("uploadTokenPayload", payload);
			next();
		} else {
			throw AttachmentError.upload.badToken();
		}
	};
}
