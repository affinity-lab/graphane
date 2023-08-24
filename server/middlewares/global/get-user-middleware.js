"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserMiddleware(authorize) {
    return async (req, res, next) => {
        let app = req.context.get("app");
        let authorized = undefined;
        if (authorize !== undefined)
            authorized = await authorize(req);
        if (authorized === undefined)
            authorized = await app?.authorize(req);
        req.context.set("authorized", authorized);
        return next();
    };
}
exports.default = getUserMiddleware;
