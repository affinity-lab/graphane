"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../../error/graphane-error"));
function Guard(...roles) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const instance = this;
            if (instance.constructor.app === undefined)
                throw graphane_error_1.default.fatal("Application not defenied in guard.");
            if (instance.app.code !== instance.constructor.app.code) {
                graphane_error_1.default.guard.forbidden();
            }
            await instance.isAuthenticated();
            if (roles.length > 0 && await instance.user.hasRole(roles)) {
                return true;
            }
            if (await originalMethod.apply(instance, args)) {
                return true;
            }
            throw graphane_error_1.default.guard.unauthorized();
        };
    };
}
exports.default = Guard;
