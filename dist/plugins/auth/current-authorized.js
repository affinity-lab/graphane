"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CurrentAuthorized {
    constructor(reader) {
        this.reader = reader;
    }
    get(req) {
        if (!req.context.has("AUTHORIZED")) {
            const authorized = this.reader(req);
            req.context.set("AUTHORIZED", authorized);
        }
        return req.context.get("AUTHORIZED");
    }
}
exports.default = CurrentAuthorized;
