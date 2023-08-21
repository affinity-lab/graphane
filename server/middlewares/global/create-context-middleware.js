"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../../context");
function createContextMiddleware() {
    return (req, res, next) => {
        let app = req.context.get("app");
        let context = new context_1.Context(app, req.context.get("authorized"), req);
        req.context.set("context", context);
        return next();
    };
}
exports.default = createContextMiddleware;
