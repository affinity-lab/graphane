"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fatal_1 = __importDefault(require("../../error/fatal"));
class Env {
    constructor(env, environment = "PROD", envPostfixMap) {
        this.env = env;
        this.envPostfixMap = envPostfixMap;
        this.info = [];
        this.environment = typeof environment === "object"
            ? this.string(environment.key, environment.default)
            : environment;
    }
    sub(key) {
        const subEnv = key.split(".").reduce((a, b) => a[b], this.env);
        if (typeof subEnv === "object")
            return new Env({ ...subEnv }, this.environment, this.envPostfixMap);
        throw (0, fatal_1.default)(`Env Sub-key not found: ${key}`);
    }
    string(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : rawValue.trim();
        if (typeof value === "undefined") {
            throw (0, fatal_1.default)(`Missing Env variable (string): ${key}`);
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
            throw (0, fatal_1.default)(`Missing Env variable (path): ${key}`);
        }
        this.info.push({ key: key, type: "path", defaultValue, value });
        value = path_1.default.resolve(process.cwd(), value);
        return value;
    }
    int(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : parseInt(rawValue.toString());
        if (typeof value === "undefined") {
            throw (0, fatal_1.default)(`Missing Env variable (int): ${key}`);
        }
        if (isNaN(value)) {
            throw (0, fatal_1.default)(`Env variable type failed: ${key} (int)`);
        }
        this.info.push({ key: key, type: "int", defaultValue, value });
        return value;
    }
    float(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : parseFloat(rawValue.toString());
        if (typeof value === "undefined") {
            throw (0, fatal_1.default)(`Missing Env variable (float): ${key}`);
        }
        if (isNaN(value)) {
            throw (0, fatal_1.default)(`Env variable type failed: ${key} (float)`);
        }
        this.info.push({ key: key, type: "float", defaultValue, value });
        return value;
    }
    boolean(key, defaultValue) {
        let rawValue = this.value(key);
        let value = typeof rawValue === "undefined"
            ? defaultValue
            : typeof rawValue === "boolean"
                ? rawValue
                : ["1", "yes", "true"].indexOf(rawValue.toLowerCase().trim()) != -1;
        if (typeof value === "undefined") {
            throw (0, fatal_1.default)(`Missing Env variable (boolean): ${key}`);
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
