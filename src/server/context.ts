import {BaseContext} from "@apollo/server";
import {TgdContext} from "type-graphql-dataloader/dist/types/TgdContext";
import Application from "../application/application";
import Authorizable from "../application/auth/authorizable";
import { Request } from "express";


export class Context implements BaseContext {
    constructor(
        public readonly app: Application | undefined,
        public readonly authorizable: Authorizable | undefined,
        public readonly  request: Request
    ) {};

    private _tgdContext: TgdContext;

    get tgdContext() {
        return this._tgdContext;
    };
}
