import { BaseContext } from "@apollo/server";
import { Request } from "express";
import { TgdContext } from "type-graphql-dataloader/dist/types/TgdContext";
export default class Context implements BaseContext {
    readonly request: Request;
    constructor(request: Request);
    private _tgdContext;
    get tgdContext(): TgdContext;
}
