import { Request } from "express";
import Authorizable from "./authorizable";
import { PrefixedApplication } from "./prefixed-application";
import { ApplicationLoggerFactory, Jwt, JwtFactory, Logger } from "./service-interfaces/service-interfaces";
export default class Application<RolesType extends Record<string, string> = Record<string, string>, CfgType extends Record<string, any> = Record<string, any>> {
    readonly cfg: CfgType;
    readonly roles: RolesType;
    private readonly jwtFactory;
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
    private static addApplication;
    readonly px: PrefixedApplication;
    readonly logger: Logger | undefined;
    readonly id: string;
    readonly code: string;
    readonly secret: string;
    readonly name: string;
    readonly jwt: Jwt<any>;
    constructor(cfg: CfgType, roles: RolesType, logger: Logger | ApplicationLoggerFactory | undefined, jwtFactory: JwtFactory, authorizeFunctions?: Array<(req: Request, app: Application) => Promise<Authorizable | undefined | false>>);
    authorize(req: Request): Promise<Authorizable | undefined>;
}
