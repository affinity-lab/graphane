"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNotFoundMiddleware = void 0;
function fileNotFoundMiddleware() {
    return (req, res) => {
        res.sendStatus(404);
    };
}
exports.fileNotFoundMiddleware = fileNotFoundMiddleware;
