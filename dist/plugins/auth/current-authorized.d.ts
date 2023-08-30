import { Request } from "express";
import { Authorizable } from "./authorizable";
export declare class CurrentAuthorized {
    private reader;
    constructor(reader: (req: Request) => Authorizable | undefined);
    get(req: Request): any;
}
