import { Request } from "express";
import { Application } from "./application";
import { Context } from "../server/context";
export declare class CurrentApplication {
    private query;
    constructor(query: (req: Request) => Promise<Application | undefined>);
    readonly fail: Fail;
    fetch(ctx: Context): Promise<Application | undefined>;
    fetch(reg: Request): Promise<Application | undefined>;
    get(req: Request): Application | undefined;
    get(ctx: Context): Application | undefined;
}
declare class Fail {
    private currentApplication;
    constructor(currentApplication: CurrentApplication);
    get(req: Request): Application;
    get(ctx: Context): Application;
}
export {};
