"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAuthorized = void 0;
const context_1 = require("../../graphane/server/context");
class CurrentAuthorized {
    constructor(reader) {
        this.reader = reader;
    }
    ;
    async get(reqOrCtx) {
        let req = reqOrCtx instanceof context_1.Context ? reqOrCtx.request : reqOrCtx;
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
