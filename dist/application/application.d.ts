import { Request } from "express";
import Authorizable from "./authorizable";
import LoggerInterface from "./loggerInteface";
import { PrefixedApplication } from "./prefixed-application";
export default class Application<RolesType extends Record<string, string> = Record<string, string>, CfgType extends Record<string, any> = Record<string, any>> {
    readonly cfg: CfgType;
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
    readonly id: string;
    readonly code: string;
    readonly secret: string;
    readonly name: string;
    constructor(cfg: CfgType, roles: RolesType, logger?: LoggerInterface | ((app: Application<any>) => LoggerInterface) | undefined, authorizeFunctions?: Array<(req: Request, app: Application) => Promise<Authorizable | undefined | false>>);
    private static addApplication;
    authorize(req: Request): Promise<Authorizable | undefined>;
}
