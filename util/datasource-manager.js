"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../graphane-error"));
class Storage {
    constructor() {
        this.storage = {};
    }
    set(key, value) { this.storage[key] = value; }
    get(key) { return (this.storage.hasOwnProperty(key)) ? this.storage[key] : undefined; }
    getOrFail(key) {
        const result = this.get(key);
        if (typeof result === "undefined")
            throw graphane_error_1.default.fatal(`Storage key (${key}) not found`, { key });
        return result;
    }
}
exports.default = Storage;
