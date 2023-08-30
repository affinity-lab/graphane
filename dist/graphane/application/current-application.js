"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CurrentApplication {
    constructor(reader) {
        this.reader = reader;
    }
    ;
    get(req) {
        if (!req.context.has("APPLICATION")) {
            req.context.set("APPLICATION", this.reader(req));
        }
        return req.context.get("APPLICATION");
    }
    ;
}
exports.default = CurrentApplication;