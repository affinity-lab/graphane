"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function authChecker({ context }, roles) {
    if (context.authorizable) {
        return context.authorizable.hasRole(roles);
    }
    return false;
}
exports.default = authChecker;
