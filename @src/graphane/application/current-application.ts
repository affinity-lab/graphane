import {Request} from "express";
import {Application} from "./application";
import {Context} from "../server/context";
import {fatalError} from "../../error/fatal-error";


function getRequest(reqOrCtx: Request | Context): Request {return reqOrCtx instanceof Context ? reqOrCtx.request : reqOrCtx;}


export class CurrentApplication {
	constructor(private query: (req: Request) => Promise<Application | undefined>) {
		this.fail = new Fail(this);
	};

	public readonly fail: Fail;

	async fetch(ctx: Context): Promise<Application | undefined>
	async fetch(rea: Request): Promise<Application | undefined>
	async fetch(reqOrCtx: Request | Context): Promise<Application | undefined> {
		let req: Request = reqOrCtx instanceof Context ? reqOrCtx.request : reqOrCtx;
		if (!req.context.has("APPLICATION")) req.context.set("APPLICATION", await this.query(req));
		return req.context.get("APPLICATION");
	};

	get(req: Request): Application | undefined
	get(ctx: Context): Application | undefined
	get(reqOrCtx: Request | Context): Application | undefined {
		let req: Request = getRequest(reqOrCtx);
		if (req.context.has("APPLICATION")) return req.context.get("APPLICATION");
		throw fatalError("Can not [get] current application without a prior [fetch]");
	}
}

class Fail {

	constructor(private currentApplication: CurrentApplication) {}

	get(req: Request): Application
	get(ctx: Context): Application
	get(reqOrCtx: Request | Context): Application {
		const authorized = this.currentApplication.get(getRequest(reqOrCtx));
		if (authorized === undefined) throw fatalError("Application not found");
		return authorized;
	}
}