"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ExportRole(name) {
    return (target, propertyKey, descriptor) => {
        if (!Reflect.hasMetadata("client-role", target)) {
            Reflect.defineMetadata("client-role", [], target);
        }
        Reflect.getMetadata("client-role", target).push({ method: propertyKey, as: name });
    };
}
exports.default = ExportRole;
