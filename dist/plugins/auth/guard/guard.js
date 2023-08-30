"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fatal_error_1 = __importDefault(require("../../../error/fatal-error"));
const auth_error_1 = __importDefault(require("../auth-error"));
function Guard(...roles) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const instance = this;
            if (instance.constructor.app === undefined)
                throw (0, fatal_error_1.default)("Application not defenied in guard.");
            if (instance.app.code !== instance.constructor.app.code) {
                auth_error_1.default.forbidden();
            }
            await instance.isAuthenticated();
            if (roles.length > 0 && await instance.user.hasRole(roles)) {
                return true;
            }
            if (await originalMethod.apply(instance, args)) {
                return true;
            }
            throw auth_error_1.default.unauthorized();
        };
    };
}
exports.default = Guard;
