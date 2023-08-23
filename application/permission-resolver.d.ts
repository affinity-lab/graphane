import { Context } from "../server/context";
import Application from "./application";
import AbstractGuard from "../guard/abstract-guard";
export declare function createRolesResolver(app: Application, guard: (ctx: Context) => AbstractGuard): any;
