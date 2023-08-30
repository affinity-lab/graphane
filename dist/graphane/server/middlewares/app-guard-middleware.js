"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fatal_1 = __importDefault(require("../../../error/fatal"));
function appGuardMiddleware(currentApplication) {
    return async (req, res, next) => {
        if (currentApplication.get(req) === undefined)
            throw (0, fatal_1.default)("Application missing from request or invalid");
        next();
    };
}
exports.default = appGuardMiddleware;
