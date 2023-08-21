import {BaseContext} from "@apollo/server";
import {Request} from "express";
import {TgdContext} from "type-graphql-dataloader/dist/types/TgdContext";
import Application from "@src/application/application";
import Authorizable from "@src/application/auth/authorizable";


export class Context implements BaseContext {
    constructor(
        public readonly app: Application | undefined,
        public readonly authorizable: Authorizable | undefined,
        public readonly request: Request
    ) {
    };

    private _tgdContext: TgdContext;

    get tgdContext() {
        return this._tgdContext;
    };
}
