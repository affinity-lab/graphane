import BaseEvent from "./base-event";


export default class EventQueue {
	handling: Promise<any> = Promise.resolve(true);
	constructor(private handler: ((event: BaseEvent) => void)) {}
	push(event: BaseEvent) {
		console.log("push");
		this.handling = this.handling.then(() => this.handler(event));
	}
}