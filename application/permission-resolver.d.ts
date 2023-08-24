import { Context } from "../server/context";
import Application from "./application";
import AbstractGuard from "../guard/abstract-guard";
export declare class Permissions {
    roles: {
        [key: string]: boolean;
    };
    constructor(roles: {
        [key: string]: boolean;
    });
}
export declare function createPermissionResolver(app: Application, guard: (ctx: Context) => AbstractGuard): any;
