"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    constructor(request) {
        this.request = request;
    }
    ;
    get tgdContext() { return this._tgdContext; }
    ;
}
exports.Context = Context;
