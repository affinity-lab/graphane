import BaseEvent from "./base-event";
export default class EventQueue {
    private handler;
    handling: Promise<any>;
    constructor(handler: ((event: BaseEvent) => void));
    push(event: BaseEvent): void;
}
