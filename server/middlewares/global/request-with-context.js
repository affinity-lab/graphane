"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestWithContext() {
    return (req, res, next) => {
        req.context = new Map();
        req.hasHeader = function (header) {
            return this.headers[header] !== undefined;
        };
        req.getHeader = function (header) {
            if (!this.hasHeader(header)) {
                return undefined;
            }
            let value = this.headers[header];
            if (typeof value === "string") {
                return value;
            }
            if (Array.isArray(value) && value.length > 0) {
                return value[0];
            }
            return undefined;
        };
        req.getNumHeader = function (header) {
            let value = this.getHeader(header);
            if (value === undefined) {
                return undefined;
            }
            value = parseInt(value);
            return Number.isNaN(value) ? undefined : value;
        };
        return next();
    };
}
exports.default = requestWithContext;
