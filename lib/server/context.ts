import {BaseContext} from "@apollo/server";
import Application from "@lib/application/application";
import Authorizable from "@lib/application/auth/authorizable";
import {TgdContext} from "type-graphql-dataloader/dist/types/TgdContext";


export class Context implements BaseContext {
    constructor(
        public readonly app: Application | undefined,
        public readonly authorizable: Authorizable | undefined
    ) {
    };

    private _tgdContext: TgdContext;

    get tgdContext() {
        return this._tgdContext;
    };
}
