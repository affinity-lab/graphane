"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../../../error/graphane-error"));
function checkFileTokenMiddleware(jwt) {
    return (req, res, next) => {
        const context = req.context.get("context");
        const payload = jwt.decode(req.getHeader("file-token"));
        if (typeof payload !== "undefined" && context.authorizable && payload.user === context.authorizable.id) {
            req.context.set("uploadTokenPayload", payload);
            next();
        }
        else {
            throw graphane_error_1.default.upload.badToken();
        }
    };
}
exports.default = checkFileTokenMiddleware;
