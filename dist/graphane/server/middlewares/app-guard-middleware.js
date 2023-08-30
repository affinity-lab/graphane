"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appGuardMiddleware = void 0;
const fatal_error_1 = require("../../../error/fatal-error");
function appGuardMiddleware(currentApplication) {
    return async (req, res, next) => {
        if (currentApplication.get(req) === undefined)
            throw (0, fatal_error_1.fatalError)("Application missing from request or invalid");
        next();
    };
}
exports.appGuardMiddleware = appGuardMiddleware;
