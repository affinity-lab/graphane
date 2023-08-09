import { BaseContext } from "@apollo/server";
import Application from "../application/application";
import Authorizable from "../application/auth/authorizable";
import { TgdContext } from "type-graphql-dataloader/dist/types/TgdContext";
export declare class Context implements BaseContext {
    readonly app: Application | undefined;
    readonly authorizable: Authorizable | undefined;
    constructor(app: Application | undefined, authorizable: Authorizable | undefined);
    private _tgdContext;
    get tgdContext(): TgdContext;
}
