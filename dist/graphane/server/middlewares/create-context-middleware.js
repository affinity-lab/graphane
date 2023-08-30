"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("../context"));
function createContextMiddleware() {
    return (req, res, next) => {
        let context = new context_1.default(req);
        req.context.set("context", context);
        return next();
    };
}
exports.default = createContextMiddleware;
