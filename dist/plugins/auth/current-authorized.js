"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CurrentAuthorized {
    constructor(reader) {
        this.reader = reader;
    }
    ;
    get(req) {
        if (!req.context.has("AUTHORIZED")) {
            req.context.set("AUTHORIZED", this.reader(req));
        }
        return req.context.get("AUTHORIZED");
    }
    ;
}
exports.default = CurrentAuthorized;
