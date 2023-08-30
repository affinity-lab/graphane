"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fatal_1 = __importDefault(require("../../../error/fatal"));
const auth_error_1 = __importDefault(require("../auth-error"));
class AbstractGuard {
    constructor(user, app) {
        this.user = user;
        if (app === undefined)
            throw (0, fatal_1.default)("Resolver called without application.");
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
            throw auth_error_1.default.unauthorized();
        }
        return true;
    }
    ;
    async isNotAuthenticated() {
        if (this.user !== undefined) {
            throw auth_error_1.default.alreadyLoggedIn();
        }
        return true;
    }
    ;
    async hasRole(...roles) {
        await this.isAuthenticated();
        if (await this.user.hasRole(roles)) {
            return true;
        }
        throw auth_error_1.default.forbidden();
    }
    ;
}
exports.default = AbstractGuard;
