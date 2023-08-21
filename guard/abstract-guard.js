"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../graphane-error"));
class AbstractGuard {
    constructor(user) {
        this.user = user;
    }
    get roles() {
        const result = {};
        if (!Reflect.hasMetadata("client-role", this))
            return result;
        const clientRoles = Reflect.getMetadata("client-role", this);
        for (const clientRole of clientRoles) {
            try {
                result[clientRole.as] = this[clientRole.method]();
            }
            catch (e) {
                result[clientRole.as] = false;
            }
        }
        return result;
    }
    isAuthenticated() {
        if (this.user === undefined)
            throw graphane_error_1.default.guard.unauthorized();
        return true;
    }
    isNotAuthenticated() {
        if (this.user !== undefined)
            throw graphane_error_1.default.guard.forbidden();
        return true;
    }
    hasRole(...roles) {
        this.isAuthenticated();
        if (this.user.hasRole(roles))
            return true;
        throw graphane_error_1.default.guard.forbidden();
    }
}
exports.default = AbstractGuard;
