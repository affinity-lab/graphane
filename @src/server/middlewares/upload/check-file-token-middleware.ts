import GraphaneError from "../../../error/graphane-error";
import {NextFunction, Request, Response} from "express";
import {Context} from "../../context";
import {UploadTokenPayload} from "../../upload-token-payload";
import {Jwt} from "../../../util/jwt";


export default function checkFileTokenMiddleware(jwt: Jwt<UploadTokenPayload>) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const context: Context = req.context.get("context");
        const payload: UploadTokenPayload | undefined = jwt.decodeJWT(req.getHeader("file-token"));
        if (typeof payload !== "undefined" && context.authorizable && payload.user === context.authorizable.id) {
            req.context.set("uploadTokenPayload", payload);
            next();
        } else {
            throw GraphaneError.upload.badToken();
        }
    };
}
