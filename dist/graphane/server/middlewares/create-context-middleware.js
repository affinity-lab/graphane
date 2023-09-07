"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextMiddleware = void 0;
const context_1 = require("../context");
function createContextMiddleware() {
    return (req, res, next) => {
        let context = new context_1.Context(req);
        req.context.set("context", context);
        return next();
    };
}
exports.createContextMiddleware = createContextMiddleware;
