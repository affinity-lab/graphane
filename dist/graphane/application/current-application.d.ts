import { Request } from "express";
import { Application } from "./application";
import { Context } from "../server/context";
export declare class CurrentApplication {
    private reader;
    constructor(reader: (req: Request) => Promise<Application | undefined>);
    get(reqOrCtx: Request | Context): Promise<Application | undefined>;
}
