import {Request} from "express";
import {Authorizable} from "./authorizable";


export class CurrentAuthorized {
	constructor(private reader: (req: Request) => Promise<Authorizable | undefined>) {};

	async get(req: Request): Promise<Authorizable | undefined> {
		if (!req.context.has("AUTHORIZED")) {
			req.context.set("AUTHORIZED", await this.reader(req));
		}
		return req.context.get("AUTHORIZED");
	};

	async id(req: Request): Promise<number | undefined> {
		return (await this.get(req))?.id;
	};
}
