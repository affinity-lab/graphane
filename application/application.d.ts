import { Request } from "express";
import Authorizable from "./auth/authorizable";
import LoggerInterface from "./loggerInteface";
import { PrefixedApplication } from "./prefixed-application";
export default class Application<RolesType extends Record<string, string> = Record<string, string>> {
    readonly id: string;
    readonly code: string;
    readonly secret: string;
    readonly name: string;
    readonly roles: RolesType;
    private authorizeFunctions;
    static applications: Application<any>[];
    static codeMap: {
        [p: string]: Application<any>;
    };
    static idMap: {
        [p: string]: Application<any>;
    };
    static get: {
        byCode: (code: string) => Application<any> | undefined;
        byId: (id: string) => Application<any> | undefined;
    };
    readonly px: PrefixedApplication;
    readonly logger: LoggerInterface | undefined;
    constructor(id: string, code: string, secret: string, name: string, roles: RolesType, logger?: LoggerInterface | ((app: Application<any>) => LoggerInterface) | undefined, authorizeFunctions?: Array<(req: Request, app: Application) => Promise<Authorizable | undefined | false>>);
    private static addApplication;
    authorize(req: Request): Promise<Authorizable | undefined>;
}
