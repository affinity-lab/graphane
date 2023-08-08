type EventRegistration = {event: typeof BaseEvent, callback: (event: any) => void | Promise<void>};

export class EventQueue {
    private registered: EventRegistration[] = [];

    register(event: typeof BaseEvent | [typeof BaseEvent], callback: (event: any) => void | Promise<void>): void {
        if (!Array.isArray(event)) {
            event = [event];
        }
        event.forEach(evt => this.registered.push({event: evt, callback}));
    };

    async fire(event: BaseEvent): Promise<any[]> {
        let promises: any[] = [];
        this.registered.forEach((reg: EventRegistration): void => {
            if (reg.event === event.constructor) {
                promises.push(reg.callback(event));
            }
        });
        return await Promise.all(promises);
    };
}

export abstract class BaseEvent {
}
