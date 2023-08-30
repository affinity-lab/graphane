import {Request} from "express";
import {Authorizable} from "./authorizable";


export class CurrentAuthorized {
	constructor(private reader: (req: Request) => Authorizable | undefined) {};

	get(req: Request) {
		if (!req.context.has("AUTHORIZED")) {
			req.context.set("AUTHORIZED", this.reader(req));
		}
		return req.context.get("AUTHORIZED");
	};
}
