"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = exports.EventQueue = void 0;
class EventQueue {
    constructor() {
        this.registered = [];
    }
    register(event, callback) {
        if (!Array.isArray(event)) {
            event = [event];
        }
        event.forEach(evt => this.registered.push({ event: evt, callback }));
    }
    ;
    async fire(event) {
        let promises = [];
        this.registered.forEach((reg) => {
            if (reg.event === event.constructor) {
                promises.push(reg.callback(event));
            }
        });
        return await Promise.all(promises);
    }
    ;
}
exports.EventQueue = EventQueue;
class BaseEvent {
}
exports.BaseEvent = BaseEvent;
