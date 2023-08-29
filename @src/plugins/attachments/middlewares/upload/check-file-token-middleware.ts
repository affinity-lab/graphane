import {NextFunction, Request, Response} from "express";
import {UploadTokenPayload} from "../../upload-token-payload";
import {Jwt} from "../../service-interfaces";
import AttachmentError from "../../attachment-error";
import CurrentAuthorized from "../../../auth/current-authorized";


export default function checkFileTokenMiddleware(jwt: Jwt<UploadTokenPayload>, currentAuthorized: CurrentAuthorized) {
	return (req: Request, res: Response, next: NextFunction): void => {
		const payload: UploadTokenPayload | undefined = jwt.decode(req.getHeader("file-token"));
		if (typeof payload !== "undefined" && currentAuthorized.get(req) && payload.user === currentAuthorized.get(req).id) {
			req.context.set("uploadTokenPayload", payload);
			next();
		} else {
			throw AttachmentError.upload.badToken();
		}
	};
}
