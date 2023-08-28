"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function moduleConfig(env, code) {
    code = env.string("CODE", code);
    return { module: { code: code } };
}
exports.default = moduleConfig;
