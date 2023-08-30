"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventQueue {
    constructor(handler) {
        this.handler = handler;
        this.handling = Promise.resolve(true);
    }
    ;
    push(event) {
        console.log("push");
        this.handling = this.handling.then(() => this.handler(event));
    }
    ;
}
exports.default = EventQueue;
