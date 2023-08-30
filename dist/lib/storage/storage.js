"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fatal_1 = __importDefault(require("../../error/fatal"));
/** A generic storage class that allows you to store and retrieve values of a specified type. */
class Storage {
    /** Creates a new instance of the Storage class.*/
    constructor(defaultKey) {
        this.defaultKey = defaultKey;
        this.storage = {};
    }
    /** Sets a value in the storage with the specified key.*/
    set(key, value) {
        this.storage[key] = value;
    }
    /** Retrieves the value associated with the given key from the storage. If no key is provided, it uses the default key if available. */
    get(key) {
        key = typeof key === "undefined" ? this.defaultKey : key;
        if (typeof key === "undefined") {
            throw (0, fatal_1.default)("Storage get called without key, and it does not have default key!");
        }
        return (this.storage.hasOwnProperty(key)) ? this.storage[key] : undefined;
    }
    /** Retrieves the value associated with the given key from the storage. If no key is provided, it uses the default key if available. Throws an error if the value is not found. */
    getOrFail(key) {
        const result = this.get(key);
        if (typeof result === "undefined") {
            throw (0, fatal_1.default)(`Storage key (${key}) not found`, { key });
        }
        return result;
    }
}
exports.default = Storage;
