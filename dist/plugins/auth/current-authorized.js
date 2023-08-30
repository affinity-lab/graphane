"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAuthorized = void 0;
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
exports.CurrentAuthorized = CurrentAuthorized;
