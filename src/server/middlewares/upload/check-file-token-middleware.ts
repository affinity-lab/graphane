import {NextFunction, Request, Response} from "express";
import decodeJWT from "../../../util/decode-jwt";
import {Context} from "../../context";
import BadUploadTokenError from "../../errors/bad-upload-token";
import {UploadTokenPayload} from "../../upload-token-payload";


export default function checkFileTokenMiddleware(uploadTokenKey: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const context: Context = req.context.get("context");
        const payload: UploadTokenPayload | undefined = decodeJWT(req.getHeader("file-token"), uploadTokenKey);
        if (typeof payload !== "undefined" && context.authorizable && payload.user === context.authorizable.id) {
            req.context.set("uploadTokenPayload", payload);
            next();
        } else {
            throw new BadUploadTokenError();
        }
    };
}
