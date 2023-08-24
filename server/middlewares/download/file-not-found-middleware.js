"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fileNotFoundMiddleware() {
    return (req, res) => {
        res.sendStatus(404);
    };
}
exports.default = fileNotFoundMiddleware;
