import {BaseContext} from "@apollo/server";
import {Request} from "express";
import {TgdContext} from "type-graphql-dataloader/dist/types/TgdContext";


export default class Context implements BaseContext {
	private _tgdContext: TgdContext;

	constructor(public readonly request: Request) {};

	get tgdContext() {return this._tgdContext;};
}
