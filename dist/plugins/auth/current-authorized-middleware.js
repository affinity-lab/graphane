"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentAuthorizedMiddleware = void 0;
function currentAuthorizedMiddleware(currentAuthorized) {
    return async (req, res, next) => {
        await currentAuthorized.fetch(req);
        next();
    };
}
exports.currentAuthorizedMiddleware = currentAuthorizedMiddleware;
