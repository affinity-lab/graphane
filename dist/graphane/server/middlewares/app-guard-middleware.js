"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appGuardMiddleware = void 0;
function appGuardMiddleware(currentApplication) {
    return async (req, res, next) => {
        await currentApplication.fetch(req);
        currentApplication.fail.get(req);
        next();
    };
}
exports.appGuardMiddleware = appGuardMiddleware;
