"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileTokenMiddleware = void 0;
const attachment_error_1 = require("../../attachment-error");
function checkFileTokenMiddleware(jwt, currentAuthorized) {
    return (req, res, next) => {
        const payload = jwt.decode(req.getHeader("file-token"));
        if (typeof payload !== "undefined" && currentAuthorized.get(req) && payload.user === currentAuthorized.get(req).id) {
            req.context.set("uploadTokenPayload", payload);
            next();
        }
        else {
            throw attachment_error_1.AttachmentError.upload.badToken();
        }
    };
}
exports.checkFileTokenMiddleware = checkFileTokenMiddleware;
