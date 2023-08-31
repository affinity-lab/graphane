"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const process_1 = __importDefault(require("process"));
function exceptionHandler(mainLogger, currentApplication) {
    return (req, res, next) => {
        process_1.default.on("uncaughtException", (e) => console.log(e));
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
