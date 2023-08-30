"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
function exceptionHandler(mainLogger) {
    return (req, res, next) => {
        try {
            next();
        }
        catch (e) {
            const app = req.context.get("app");
            if (typeof app == "undefined") {
                mainLogger.error(e);
            }
            else {
                app.logger?.error(e);
            }
            res.status(400).send(e);
        }
    };
}
exports.exceptionHandler = exceptionHandler;
