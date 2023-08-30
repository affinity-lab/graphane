"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CurrentApplication {
    constructor(reader) {
        this.reader = reader;
    }
    get(req) {
        if (!req.context.has("APPLICATION")) {
            const application = this.reader(req);
            req.context.set("APPLICATION", application);
        }
        return req.context.get("APPLICATION");
    }
}
exports.default = CurrentApplication;
