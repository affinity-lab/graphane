import { Request } from "express";
import { PrefixedApplication } from "./prefixed-application";
import { ApplicationLoggerFactory, Env, Jwt, JwtFactory, Logger } from "../service-interfaces";
type ApplicationMiddleware = (req: Request, app: Application) => Promise<any>;
export declare class Application<RolesType extends Record<string, string> = Record<string, string>, CfgType extends Record<string, any> = Record<string, any>> {
    readonly cfg: CfgType;
    readonly roles: RolesType;
    private readonly jwtFactory;
    private middlewares;
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
    static cfg(env: Env, code?: string): {
        app: {
            id: string;
            code: string;
            secret: string;
            name: string;
        };
    };
    readonly px: PrefixedApplication;
    readonly logger: Logger | undefined;
    readonly id: string;
    readonly code: string;
    readonly secret: string;
    readonly name: string;
    readonly jwt: Jwt<any>;
    constructor(cfg: CfgType, roles: RolesType, logger: Logger | ApplicationLoggerFactory | undefined, jwtFactory: JwtFactory, middlewares?: Array<ApplicationMiddleware>);
    runMiddlewares(req: Request): Promise<void>;
}
export {};
