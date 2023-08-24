import {DerivedClass} from "../util/types";
import BaseEvent from "./base-event";


type EventRegistration = { event: DerivedClass<BaseEvent>, handler: (event: any) => void | Promise<void> };

export default class EventManager {
	private registered: Array<EventRegistration> = [];

	register(event: DerivedClass<BaseEvent> | [DerivedClass<BaseEvent>], handler: (event: BaseEvent) => void | Promise<void>): void {
		if (!Array.isArray(event)) event = [event];
		event.forEach((evt:(new (...a: any[]) => BaseEvent)) => this.registered.push({event: evt, handler}));
	};

	async fire(event: BaseEvent): Promise<any[]> {
		let promises: any[] = [];
		this.registered.forEach((reg: EventRegistration): void => {
			if (reg.event === event.constructor) {
				promises.push(reg.handler(event));
			}
		});
		return await Promise.all(promises);
	};
}


