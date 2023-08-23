"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventManager {
    constructor() {
        this.registered = [];
    }
    register(event, handler) {
        if (!Array.isArray(event))
            event = [event];
        event.forEach((evt) => this.registered.push({ event: evt, handler }));
    }
    ;
    async fire(event) {
        let promises = [];
        this.registered.forEach((reg) => {
            if (reg.event === event.constructor) {
                promises.push(reg.handler(event));
            }
        });
        return await Promise.all(promises);
    }
    ;
}
exports.default = EventManager;
