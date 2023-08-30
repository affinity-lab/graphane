import { Context } from "../../graphane/server/context";
import { Application } from "../../graphane/application/application";
import { AbstractGuard } from "./guard/abstract-guard";
export declare class Permissions {
    roles: Record<string, boolean>;
    constructor(roles: Record<string, boolean>);
}
export declare function createPermissionResolver(app: Application, guard: (ctx: Context) => AbstractGuard): any;
