"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decode_jwt_1 = __importDefault(require("../../../util/decode-jwt"));
const graphane_error_1 = __importDefault(require("../../../graphane-error"));
function checkFileTokenMiddleware(uploadTokenKey) {
    return (req, res, next) => {
        const context = req.context.get("context");
        const payload = (0, decode_jwt_1.default)(req.getHeader("file-token"), uploadTokenKey);
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
