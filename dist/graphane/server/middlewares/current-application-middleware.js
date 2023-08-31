"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentApplicationMiddleware = void 0;
function currentApplicationMiddleware(currentApplication, fail = true) {
    if (fail) {
        return async (req, res, next) => {
            await currentApplication.fetch(req);
            currentApplication.fail.get(req);
            next();
        };
    }
    return async (req, res, next) => {
        await currentApplication.fetch(req);
        next();
    };
}
exports.currentApplicationMiddleware = currentApplicationMiddleware;
