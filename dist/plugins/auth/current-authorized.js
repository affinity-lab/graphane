"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAuthorized = void 0;
const context_1 = require("../../graphane/server/context");
const fatal_error_1 = require("../../error/fatal-error");
const auth_error_1 = require("./auth-error");
function getRequest(reqOrCtx) { return reqOrCtx instanceof context_1.Context ? reqOrCtx.request : reqOrCtx; }
/**
 * A utility class for managing authorization and retrieving the current authorized user.
 */
class CurrentAuthorized {
    /**
     * Create a new instance of the CurrentAuthorized class.
     * @param query - A function that queries and retrieves the authorized user.
     */
    constructor(query) {
        this.query = query;
        this.fail = new Fail(this);
    }
    async fetch(reqOrCtx) {
        let req = getRequest(reqOrCtx);
        if (!req.context.has("AUTHORIZED"))
            req.context.set("AUTHORIZED", await this.query(req));
        return req.context.get("AUTHORIZED");
    }
    get(reqOrCtx) {
        let req = getRequest(reqOrCtx);
        if (req.context.has("AUTHORIZED"))
            return req.context.get("AUTHORIZED");
        throw (0, fatal_error_1.fatalError)("Can not [get] current authorized without a prior [fetch]");
    }
    id(reqOrCtx) {
        return this.get(getRequest(reqOrCtx))?.id;
    }
}
exports.CurrentAuthorized = CurrentAuthorized;
class Fail {
    constructor(currentAuthorized) {
        this.currentAuthorized = currentAuthorized;
    }
    get(reqOrCtx) {
        const authorized = this.currentAuthorized.get(getRequest(reqOrCtx));
        if (authorized === undefined)
            throw auth_error_1.AuthError.unauthorized();
        return authorized;
    }
    id(reqOrCtx) {
        return this.get(getRequest(reqOrCtx)).id;
    }
    ;
}
