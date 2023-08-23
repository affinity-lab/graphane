"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
class AbstractGuard {
    constructor(user, app) {
        this.user = user;
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
            throw graphane_error_1.default.guard.unauthorized();
        }
        return true;
    }
    ;
    async isNotAuthenticated() {
        if (this.user !== undefined) {
            throw graphane_error_1.default.guard.forbidden();
        }
        return true;
    }
    ;
    async hasRole(...roles) {
        await this.isAuthenticated();
        if (await this.user.hasRole(roles)) {
            return true;
        }
        throw graphane_error_1.default.guard.forbidden();
    }
    ;
}
exports.default = AbstractGuard;
