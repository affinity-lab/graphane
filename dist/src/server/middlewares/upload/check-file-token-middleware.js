"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decode_jwt_1 = __importDefault(require("../../../util/decode-jwt"));
const bad_upload_token_1 = __importDefault(require("../../errors/bad-upload-token"));
function checkFileTokenMiddleware(uploadTokenKey) {
    return (req, res, next) => {
        const context = req.context.get("context");
        const payload = (0, decode_jwt_1.default)(req.getHeader("file-token"), uploadTokenKey);
        if (typeof payload !== "undefined" && context.authorizable && payload.user === context.authorizable.id) {
            req.context.set("uploadTokenPayload", payload);
            next();
        }
        else {
            throw new bad_upload_token_1.default();
        }
    };
}
exports.default = checkFileTokenMiddleware;
