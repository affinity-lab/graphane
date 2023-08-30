import {NextFunction, Request, Response} from "express";
import {UploadTokenPayload} from "../../upload-token-payload";
import {Jwt} from "../../service-interfaces";
import {AttachmentError} from "../../attachment-error";
import {CurrentAuthorized} from "../../../auth/current-authorized";


export function checkFileTokenMiddleware(jwt: Jwt<UploadTokenPayload>, currentAuthorized: CurrentAuthorized) {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const payload: UploadTokenPayload | undefined = jwt.decode(req.getHeader("file-token"));
		if (typeof payload !== "undefined" && await currentAuthorized.get(req) && payload.user === await currentAuthorized.id(req)) {
			req.context.set("uploadTokenPayload", payload);
			next();
		} else {
			throw AttachmentError.upload.badToken();
		}
	};
}
