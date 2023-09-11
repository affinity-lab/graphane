"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const preprocess_error_tree_1 = require("../../../error/preprocess-error-tree");
function exceptionHandler(mainLogger, currentApplication) {
    return async (error, req, res, next) => {
        const app = await currentApplication.fetch(req);
        if (app?.logger !== undefined)
            app.logger.error(error);
        else
            mainLogger.error(error);
        if (error instanceof preprocess_error_tree_1.GraphaneException) {
            res.status(error.status);
            res.json(error.errorData);
        }
        else {
            res.status(500);
            res.json({ error: error.message });
        }
        next();
    };
}
exports.exceptionHandler = exceptionHandler;
