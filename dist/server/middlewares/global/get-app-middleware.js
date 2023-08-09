"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("../../../application/application"));
function getAppMiddleware(guard = false) {
    return (req, res, next) => {
        let app;
        if (req.hasHeader("api-key")) {
            app = application_1.default.get.byId(req.getHeader("api-key"));
        }
        if (guard && !app) {
            res.setHeader("error", "api-guard: api-key not found").sendStatus(401);
        }
        req.context.set("app", app);
        return next();
    };
}
exports.default = getAppMiddleware;
