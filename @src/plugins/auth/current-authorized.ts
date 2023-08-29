import {Request} from "express";
import Authorizable from "./authorizable";


export default class CurrentAuthorized {
	constructor(private reader: (req: Request) => Authorizable | undefined) {}
	get(req: Request) {
		if (!req.context.has("AUTHORIZED")) {
			const authorized = this.reader(req);
			req.context.set("AUTHORIZED", authorized);
		}
		return req.context.get("AUTHORIZED");
	}
}