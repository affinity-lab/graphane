import {Request} from "express";
import {Authorizable} from "./authorizable";
import {Context} from "../../graphane/server/context";
import {fatalError} from "../../error/fatal-error";
import {AuthError} from "./auth-error";


function getRequest(reqOrCtx: Request | Context): Request {return reqOrCtx instanceof Context ? reqOrCtx.request : reqOrCtx;}


/**
 * A utility class for managing authorization and retrieving the current authorized user.
 */
export class CurrentAuthorized {

	/**
	 * Create a new instance of the CurrentAuthorized class.
	 * @param query - A function that queries and retrieves the authorized user.
	 */
	constructor(private query: (req: Request) => Promise<Authorizable | undefined>) {
		this.fail = new Fail(this);
	}

	public readonly fail: Fail;

	async fetch(req: Request): Promise<Authorizable | undefined>
	async fetch(ctx: Context): Promise<Authorizable | undefined>
	async fetch(reqOrCtx: Request | Context): Promise<Authorizable | undefined> {
		let req: Request = getRequest(reqOrCtx);
		if (!req.context.has("AUTHORIZED")) req.context.set("AUTHORIZED", await this.query(req));
		return req.context.get("AUTHORIZED");
	}

	get(req: Request): Authorizable | undefined
	get(ctx: Context): Authorizable | undefined
	get(reqOrCtx: Request | Context): Authorizable | undefined {
		let req: Request = getRequest(reqOrCtx);
		if (req.context.has("AUTHORIZED")) return req.context.get("AUTHORIZED");
		throw fatalError("Can not [get] current authorized without a prior [fetch]");
	}


	id(req: Request): number | undefined
	id(ctx: Context): number | undefined
	id(reqOrCtx: Request | Context): number | undefined {
		return this.get(getRequest(reqOrCtx))?.id;
	}
}

class Fail {
	constructor(private currentAuthorized: CurrentAuthorized) {}

	get(req: Request): Authorizable
	get(ctx: Context): Authorizable
	get(reqOrCtx: Request | Context): Authorizable {
		const authorized = this.currentAuthorized.get(getRequest(reqOrCtx));
		if (authorized === undefined) throw AuthError.unauthorized();
		return authorized;
	}

	id(req: Request): number
	id(ctx: Context): number
	id(reqOrCtx: Request | Context): number {
		return this.get(getRequest(reqOrCtx)).id;
	};
}