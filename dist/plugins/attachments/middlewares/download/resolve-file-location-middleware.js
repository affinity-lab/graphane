"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFileLocationMiddleware = void 0;
function resolveFileLocationMiddleware() {
    return (req, res, next) => {
        let b36 = parseInt(req.params["id"]).toString(36).padStart(6, "0");
        req.url = `/${req.params["module"]}/${req.params["entity"]}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${req.params["catalog"]}/${req.params["file"]}`;
        next();
    };
}
exports.resolveFileLocationMiddleware = resolveFileLocationMiddleware;
resolveFileLocationMiddleware.locationParams = "/:module/:entity/:id/:catalog/:file";
resolveFileLocationMiddleware.route = (baseUrl) => baseUrl + "/:module/:entity/:id/:catalog/:file";
