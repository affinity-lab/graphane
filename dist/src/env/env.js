"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const bad_environmental_variable_1 = __importDefault(require("./errors/bad-environmental-variable"));
const missing_environmental_variable_error_1 = __importDefault(require("./errors/missing-environmental-variable-error"));
class Env {
    constructor(env) {
        this.env = env;
        this.isTest = this.boolean("IS_TEST", false);
    }
    ;
    value(key) {
        if (this.isTest && this.env.hasOwnProperty("TEST_" + key)) {
            return this.env["TEST_" + key];
        }
        if (this.env.hasOwnProperty(key)) {
            return this.env[key];
        }
        return undefined;
    }
    ;
    string(key, default_) {
        let value = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new missing_environmental_variable_error_1.default(key);
            }
            return default_;
        }
        return value;
    }
    ;
    int(key, default_) {
        let value = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new missing_environmental_variable_error_1.default(key);
            }
            return default_;
        }
        let returnValue = parseInt(value);
        if (isNaN(returnValue)) {
            throw new bad_environmental_variable_1.default(key, "integer");
        }
        return returnValue;
    }
    ;
    float(key, default_) {
        let value = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new missing_environmental_variable_error_1.default(key);
            }
            return default_;
        }
        let returnValue = parseFloat(value);
        if (isNaN(returnValue)) {
            throw new bad_environmental_variable_1.default(key, "float");
        }
        return returnValue;
    }
    ;
    boolean(key, default_) {
        let value = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new missing_environmental_variable_error_1.default(key);
            }
            return default_;
        }
        return ["1", "yes", "true"].indexOf(value.toLowerCase().trim()) != -1;
    }
    ;
}
exports.Env = Env;
