import { Request } from "express";
import { Authorizable } from "./authorizable";
import { Context } from "../../graphane/server/context";
/**
 * A utility class for managing authorization and retrieving the current authorized user.
 */
export declare class CurrentAuthorized {
    private query;
    /**
     * Create a new instance of the CurrentAuthorized class.
     * @param query - A function that queries and retrieves the authorized user.
     */
    constructor(query: (req: Request) => Promise<Authorizable | undefined>);
    readonly fail: Fail;
    fetch(req: Request): Promise<Authorizable | undefined>;
    fetch(ctx: Context): Promise<Authorizable | undefined>;
    get(req: Request): Authorizable | undefined;
    get(ctx: Context): Authorizable | undefined;
    id(req: Request): number | undefined;
    id(ctx: Context): number | undefined;
}
declare class Fail {
    private currentAuthorized;
    constructor(currentAuthorized: CurrentAuthorized);
    get(req: Request): Authorizable;
    get(ctx: Context): Authorizable;
    id(req: Request): number;
    id(ctx: Context): number;
}
export {};
