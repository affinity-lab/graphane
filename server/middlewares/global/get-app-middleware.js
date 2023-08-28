"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("../../../application/application"));
function getAppMiddleware(guarded = false, acceptCode = false) {
    return (req, res, next) => {
        let app;
        if (acceptCode && req.hasHeader("api-code"))
            app = application_1.default.get.byCode(req.getHeader("api-code"));
        if (app === undefined && req.hasHeader("api-key"))
            app = application_1.default.get.byId(req.getHeader("api-key"));
        if (guarded && app === undefined) {
            res.setHeader("error", "api-key not found").sendStatus(401);
        }
        else {
            req.context.set("app", app);
            return next();
        }
    };
}
exports.default = getAppMiddleware;
