"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_registered_app_error_1 = __importDefault(require("../../errors/not-registered-app-error"));
function appGuardMiddleware() {
    return async (req, res, next) => {
        if (!req.context.get("app")) {
            throw new not_registered_app_error_1.default();
        }
        next();
    };
}
exports.default = appGuardMiddleware;
