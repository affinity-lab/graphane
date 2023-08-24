"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
const path_1 = __importDefault(require("path"));
class Env {
    constructor(env, environment = "PROD", envPostfixMap) {
        this.env = env;
        this.environment = environment;
        this.envPostfixMap = envPostfixMap;
        this.info = [];
    }
    string(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : rawValue.trim();
        if (typeof value === "undefined") {
            throw graphane_error_1.default.fatal(`Missing Env variable: ${key}`);
        }
        this.info.push({ key: key, type: "string", defaultValue, value });
        return value;
    }
    path(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : rawValue.trim();
        if (typeof value === "undefined") {
            throw graphane_error_1.default.fatal(`Missing Env variable: ${key}`);
        }
        this.info.push({ key: key, type: "path", defaultValue, value });
        value = path_1.default.resolve(process.cwd(), value);
        return value;
    }
    int(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : parseInt(rawValue);
        if (typeof value === "undefined") {
            throw graphane_error_1.default.fatal(`Missing Env variable: ${key}`);
        }
        if (isNaN(value)) {
            throw graphane_error_1.default.fatal(`Env variable type failed: ${key} (int)`);
        }
        this.info.push({ key: key, type: "int", defaultValue, value });
        return value;
    }
    float(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : parseFloat(rawValue);
        if (typeof value === "undefined") {
            throw graphane_error_1.default.fatal(`Missing Env variable: ${key}`);
        }
        if (isNaN(value)) {
            throw graphane_error_1.default.fatal(`Env variable type failed: ${key} (float)`);
        }
        this.info.push({ key: key, type: "float", defaultValue, value });
        return value;
    }
    boolean(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : ["1", "yes", "true"].indexOf(rawValue.toLowerCase().trim()) != -1;
        if (typeof value === "undefined") {
            throw graphane_error_1.default.fatal(`Missing Env variable: ${key}`);
        }
        this.info.push({ key: key, type: "boolean", defaultValue, value });
        return value;
    }
    value(key) {
        const postfix = this.envPostfixMap[this.environment];
        const optionalKey = postfix !== undefined ? `${key}__${this.envPostfixMap[this.environment]}` : undefined;
        if (optionalKey !== undefined && this.env.hasOwnProperty(optionalKey))
            return this.env[optionalKey];
        if (this.env.hasOwnProperty(key))
            return this.env[key];
        return undefined;
    }
}
exports.default = Env;
