"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentApplication = void 0;
const context_1 = require("../server/context");
class CurrentApplication {
    constructor(reader) {
        this.reader = reader;
    }
    ;
    async get(reqOrCtx) {
        let req = reqOrCtx instanceof context_1.Context ? reqOrCtx.request : reqOrCtx;
        if (!req.context.has("APPLICATION")) {
            req.context.set("APPLICATION", await this.reader(req));
        }
        return req.context.get("APPLICATION");
    }
    ;
}
exports.CurrentApplication = CurrentApplication;
