import { Request } from "express";
import { Application } from "./application";
export declare class CurrentApplication {
    private reader;
    constructor(reader: (req: Request) => Promise<Application | undefined>);
    get(req: Request): Promise<Application | undefined>;
}
