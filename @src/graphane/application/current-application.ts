import {Request} from "express";
import {Application} from "./application";
import {Context} from "../server/context";


export class CurrentApplication {
	constructor(private reader: (req: Request) => Promise<Application | undefined>) {};

	async get(reqOrCtx: Request | Context): Promise<Application | undefined> {
		let req: Request = reqOrCtx instanceof Context ? reqOrCtx.request : reqOrCtx;
		if (!req.context.has("APPLICATION")) {
			req.context.set("APPLICATION", await this.reader(req));
		}
		return req.context.get("APPLICATION");
	};
}
