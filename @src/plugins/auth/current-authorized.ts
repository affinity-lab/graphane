import {Request} from "express";
import {Authorizable} from "./authorizable";
import {Context} from "../../graphane/server/context";


export class CurrentAuthorized {
	constructor(private reader: (req: Request) => Promise<Authorizable | undefined>) {};

	async get(reqOrCtx: Request | Context): Promise<Authorizable | undefined> {
		let req: Request = reqOrCtx instanceof Context ? reqOrCtx.request : reqOrCtx;
		if (!req.context.has("AUTHORIZED")) {
			req.context.set("AUTHORIZED", await this.reader(req));
		}
		return req.context.get("AUTHORIZED");
	};

	async id(req: Request | Context): Promise<number | undefined> {
		return (await this.get(req))?.id;
	};
}
