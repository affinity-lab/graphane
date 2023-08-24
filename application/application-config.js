"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applicationConfig(env, code) {
    code = env.string("CODE", code);
    return {
        app: {
            id: env.string("ID"),
            code: code,
            secret: env.string("SECRET"),
            name: env.string("NAME", code)
        }
    };
}
exports.default = applicationConfig;
