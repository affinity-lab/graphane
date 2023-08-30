"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueue = void 0;
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
exports.EventQueue = EventQueue;
