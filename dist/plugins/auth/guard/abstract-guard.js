"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGuard = void 0;
const fatal_error_1 = require("../../../error/fatal-error");
const auth_error_1 = require("../auth-error");
class AbstractGuard {
    constructor(user, app) {
        this.user = user;
        if (AbstractGuard.app.length === 0)
            throw (0, fatal_error_1.fatalError)("Allowed application(s) not defined in guard.");
        if (app === undefined)
            throw auth_error_1.AuthError.unauthorized();
        this.app = app;
    }
    ;
    async getRoles() {
        const result = {};
        if (!Reflect.hasMetadata("client-role", this)) {
            return result;
        }
        const clientRoles = Reflect.getMetadata("client-role", this);
        for (const clientRole of clientRoles) {
            try {
                result[clientRole.as] = await this[clientRole.method]();
            }
            catch (e) {
                result[clientRole.as] = false;
            }
        }
        return result;
    }
    ;
    async isAuthenticated() {
        if (this.user === undefined) {
            throw auth_error_1.AuthError.unauthorized();
        }
        return true;
    }
    ;
    async isNotAuthenticated() {
        if (this.user !== undefined) {
            throw auth_error_1.AuthError.alreadyLoggedIn();
        }
        return true;
    }
    ;
    async hasRole(...roles) {
        await this.isAuthenticated();
        if (await this.user.hasRole(roles)) {
            return true;
        }
        throw auth_error_1.AuthError.forbidden();
    }
    ;
}
exports.AbstractGuard = AbstractGuard;
AbstractGuard.app = [];
