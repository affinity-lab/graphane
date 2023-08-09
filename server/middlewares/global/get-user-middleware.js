"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserMiddleware() {
    return async (req, res, next) => {
        let app = req.context.get("app");
        let authorized = await app?.authorize(req);
        req.context.set("authorized", authorized);
        return next();
    };
}
exports.default = getUserMiddleware;
