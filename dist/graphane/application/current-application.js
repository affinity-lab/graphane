"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentApplication = void 0;
class CurrentApplication {
    constructor(reader) {
        this.reader = reader;
    }
    ;
    async get(req) {
        if (!req.context.has("APPLICATION")) {
            req.context.set("APPLICATION", await this.reader(req));
        }
        return req.context.get("APPLICATION");
    }
    ;
}
exports.CurrentApplication = CurrentApplication;
