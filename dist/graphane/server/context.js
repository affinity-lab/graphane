"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor(request) {
        this.request = request;
    }
    ;
    get tgdContext() { return this._tgdContext; }
    ;
}
exports.default = Context;
