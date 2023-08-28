"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
function moduleConfig(env, code) {
    if (env !== null)
        code = env.string("CODE", code);
    if (code === undefined)
        throw graphane_error_1.default.fatal();
    return { module: { code: code } };
}
exports.default = moduleConfig;
