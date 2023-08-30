import { Request } from "express";
import { Authorizable } from "./authorizable";
export declare class CurrentAuthorized {
    private reader;
    constructor(reader: (req: Request) => Promise<Authorizable | undefined>);
    get(req: Request): Promise<Authorizable | undefined>;
    id(req: Request): Promise<number | undefined>;
}
