import { BaseContext } from "@apollo/server";
import { Request } from "express";
import { TgdContext } from "type-graphql-dataloader/dist/types/TgdContext";
import Application from "@src/application/application";
import Authorizable from "@src/application/auth/authorizable";
export declare class Context implements BaseContext {
    readonly app: Application | undefined;
    readonly authorizable: Authorizable | undefined;
    readonly request: Request;
    constructor(app: Application | undefined, authorizable: Authorizable | undefined, request: Request);
    private _tgdContext;
    get tgdContext(): TgdContext;
}
