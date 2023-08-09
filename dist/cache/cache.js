"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const crypto = __importStar(require("crypto"));
function timestamp() {
    return Math.floor((new Date()).getTime() / 1000);
}
class CacheItem {
    constructor(item) {
        this.item = item;
        this.created = timestamp();
    }
    ;
}
class Cache {
    constructor(fetch, keygen, ttl = 60, gc = 10) {
        this.fetch = fetch;
        this.ttl = ttl;
        this.gc = gc;
        this.cache = {};
        this.keygen = keygen === undefined ? (args) => crypto.createHash("md5").update(JSON.stringify(args)).digest("hex") : keygen;
        setInterval(() => {
            for (let key in this.cache) {
                if (this.cache[key].created + ttl > timestamp()) {
                    delete this.cache[key];
                }
            }
        }, gc);
    }
    ;
    async get(args) {
        let key = this.keygen(args);
        let item = this.hasKey(key) ? this.cache[key].item : await this.fetch(args);
        if (item !== undefined) {
            this.set(key, item);
        }
        return item;
    }
    ;
    has(args) {
        return this.hasKey(this.keygen(args));
    }
    ;
    invalidate(args) {
        delete this.cache[this.keygen(args)];
    }
    ;
    clear() {
        this.cache = {};
    }
    ;
    set(key, item) {
        this.cache[key] = new CacheItem(item);
    }
    ;
    hasKey(key) {
        return !Object.hasOwn(this.cache, key) ? false : this.cache[key].created + this.ttl <= timestamp();
    }
    ;
}
exports.Cache = Cache;
