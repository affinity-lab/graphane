import { BaseContext } from "@apollo/server";
import { TgdContext } from "type-graphql-dataloader/dist/types/TgdContext";
import Application from "../application/application";
import Authorizable from "../application/auth/authorizable";
import { Request } from "express";
export declare class Context implements BaseContext {
    readonly app: Application | undefined;
    readonly authorizable: Authorizable | undefined;
    readonly request: Request;
    constructor(app: Application | undefined, authorizable: Authorizable | undefined, request: Request);
    private _tgdContext;
    get tgdContext(): TgdContext;
}
