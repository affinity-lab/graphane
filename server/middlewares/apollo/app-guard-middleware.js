"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("@src/error/graphane-error"));
function appGuardMiddleware() {
    return async (req, res, next) => {
        if (!req.context.get("app")) {
            throw graphane_error_1.default.application.notFound();
        }
        next();
    };
}
exports.default = appGuardMiddleware;
