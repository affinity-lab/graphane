"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
function Guard(...roles) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const instance = this;
            instance.isAuthenticated();
            if (roles.length > 0 && instance.user.hasRole(roles)) {
                return true;
            }
            if (originalMethod.apply(instance, args)) {
                return true;
            }
            throw graphane_error_1.default.guard.unauthorized();
        };
    };
}
exports.default = Guard;
