"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const fatal_error_1 = require("../../../error/fatal-error");
const auth_error_1 = require("../auth-error");
function Guard(...roles) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const instance = this;
            if (instance.constructor.app === undefined)
                throw (0, fatal_error_1.fatalError)("Application not defenied in guard.");
            if (instance.app.code !== instance.constructor.app.code) {
                auth_error_1.AuthError.forbidden();
            }
            await instance.isAuthenticated();
            if (roles.length > 0 && await instance.user.hasRole(roles)) {
                return true;
            }
            if (await originalMethod.apply(instance, args)) {
                return true;
            }
            throw auth_error_1.AuthError.unauthorized();
        };
    };
}
exports.Guard = Guard;
