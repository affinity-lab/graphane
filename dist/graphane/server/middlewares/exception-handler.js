"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
function exceptionHandler(mainLogger, currentApplication) {
    return (req, res, next) => {
        try {
            next();
        }
        catch (e) {
            const app = currentApplication.get(req);
            if (app === undefined || app.logger === undefined)
                mainLogger.error(e);
            else
                app.logger.error(e);
            res.status(400).send(e);
        }
    };
}
exports.exceptionHandler = exceptionHandler;
