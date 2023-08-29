import {BaseContext} from "@apollo/server";
import {Request} from "express";
import {TgdContext} from "type-graphql-dataloader/dist/types/TgdContext";


export default class Context implements BaseContext {
	constructor(public readonly request: Request) {};

	private _tgdContext: TgdContext;
	get tgdContext() {return this._tgdContext;};
}
