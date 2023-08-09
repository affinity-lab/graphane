"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exceptionHandler() {
    return (req, res, next) => {
        try {
            next();
        }
        catch (e) {
            console.log("-------------------------------------");
            console.log(e);
            console.log("-------------------------------------");
            res.status(400).send(e);
        }
    };
}
exports.default = exceptionHandler;
