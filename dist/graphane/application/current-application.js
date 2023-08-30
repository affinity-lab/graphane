"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentApplication = void 0;
const context_1 = require("../server/context");
const fatal_error_1 = require("../../error/fatal-error");
function getRequest(reqOrCtx) { return reqOrCtx instanceof context_1.Context ? reqOrCtx.request : reqOrCtx; }
class CurrentApplication {
    constructor(query) {
        this.query = query;
        this.fail = new Fail(this);
    }
    ;
    async fetch(reqOrCtx) {
        let req = reqOrCtx instanceof context_1.Context ? reqOrCtx.request : reqOrCtx;
        if (!req.context.has("APPLICATION"))
            req.context.set("APPLICATION", await this.query(req));
        return req.context.get("APPLICATION");
    }
    ;
    get(reqOrCtx) {
        let req = getRequest(reqOrCtx);
        if (req.context.has("APPLICATION"))
            return req.context.get("APPLICATION");
        throw (0, fatal_error_1.fatalError)("Can not [get] current application without a prior [fetch]");
    }
}
exports.CurrentApplication = CurrentApplication;
class Fail {
    constructor(currentApplication) {
        this.currentApplication = currentApplication;
    }
    get(reqOrCtx) {
        const authorized = this.currentApplication.get(getRequest(reqOrCtx));
        if (authorized === undefined)
            throw (0, fatal_error_1.fatalError)("Application not found");
        return authorized;
    }
}
