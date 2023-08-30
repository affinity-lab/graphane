"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachment_error_1 = __importDefault(require("../../attachment-error"));
function checkFileTokenMiddleware(jwt, currentAuthorized) {
    return (req, res, next) => {
        const payload = jwt.decode(req.getHeader("file-token"));
        if (typeof payload !== "undefined" && currentAuthorized.get(req) && payload.user === currentAuthorized.get(req).id) {
            req.context.set("uploadTokenPayload", payload);
            next();
        }
        else {
            throw attachment_error_1.default.upload.badToken();
        }
    };
}
exports.default = checkFileTokenMiddleware;
