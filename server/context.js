"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    constructor(app, authorizable) {
        this.app = app;
        this.authorizable = authorizable;
    }
    ;
    get tgdContext() {
        return this._tgdContext;
    }
    ;
}
exports.Context = Context;
