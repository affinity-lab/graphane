import { Application } from "../../graphane/application/application";
import { AbstractGuard } from "./guard/abstract-guard";
import { Authorizable } from "./authorizable";
import { CurrentApplication } from "../../graphane/application/current-application";
import { CurrentAuthorized } from "./current-authorized";
export declare class Permissions {
    roles: Record<string, boolean>;
    constructor(roles: Record<string, boolean>);
}
export declare class PermissionResolver {
    private currentApplication;
    private currentAuthorized;
    constructor(currentApplication: CurrentApplication, currentAuthorized: CurrentAuthorized);
    create(app: Application, guardFactory: (app: Application, authorizable: Authorizable | undefined) => AbstractGuard): any;
}
