import { Request } from "express";
import { Authorizable } from "./authorizable";
import { Context } from "../../graphane/server/context";
export declare class CurrentAuthorized {
    private reader;
    constructor(reader: (req: Request) => Promise<Authorizable | undefined>);
    get(reqOrCtx: Request | Context): Promise<Authorizable | undefined>;
    id(req: Request | Context): Promise<number | undefined>;
}
