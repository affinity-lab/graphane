"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentApplicationMiddleware = void 0;
function currentApplicationMiddleware(currentApplication) {
    return async (req, res, next) => {
        await currentApplication.fetch(req);
        currentApplication.fail.get(req);
        next();
    };
}
exports.currentApplicationMiddleware = currentApplicationMiddleware;
