import {Request} from "express";
import Application from "./application";


export default class CurrentApplication {
	constructor(private reader: (req: Request) => Application | undefined) {};

	get(req: Request) {
		if (!req.context.has("APPLICATION")) {
			req.context.set("APPLICATION", this.reader(req));
		}
		return req.context.get("APPLICATION");
	};
}
