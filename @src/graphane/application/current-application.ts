import {Request} from "express";
import Application from "./application";


export default class CurrentApplication {
	constructor(private reader: (req: Request) => Application | undefined) {}
	get(req: Request) {
		if (!req.context.has("APPLICATION")) {
			const application = this.reader(req);
			req.context.set("APPLICATION", application);
		}
		return req.context.get("APPLICATION");
	}
}