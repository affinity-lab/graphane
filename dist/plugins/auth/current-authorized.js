"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAuthorized = void 0;
class CurrentAuthorized {
    constructor(reader) {
        this.reader = reader;
    }
    ;
    async get(req) {
        if (!req.context.has("AUTHORIZED")) {
            req.context.set("AUTHORIZED", await this.reader(req));
        }
        return req.context.get("AUTHORIZED");
    }
    ;
    async id(req) {
        return (await this.get(req))?.id;
    }
    ;
}
exports.CurrentAuthorized = CurrentAuthorized;
