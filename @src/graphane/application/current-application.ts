import {Request} from "express";
import {Application} from "./application";


export class CurrentApplication {
	constructor(private reader: (req: Request) => Promise<Application | undefined>) {};

	async get(req: Request): Promise<Application | undefined> {
		if (!req.context.has("APPLICATION")) {
			req.context.set("APPLICATION", await this.reader(req));
		}
		return req.context.get("APPLICATION");
	};
}
