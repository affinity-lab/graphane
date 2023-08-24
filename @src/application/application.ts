import GraphaneError from "../error/graphane-error";
import {Request} from "express";
import Authorizable from "./authorizable";
import LoggerInterface from "./loggerInteface";
import {PrefixedApplication} from "./prefixed-application";


export default class Application<RolesType extends Record<string, string> = Record<string, string>, CfgType extends Record<string, any> = Record<string, any>> {
	
    static applications: Application<any>[] = [];

    static codeMap: {[p: string]: Application<any>} = {};

    static idMap: {[p: string]: Application<any>} = {};

    static get = {
        byCode: (code: string): Application<any> | undefined => this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : undefined,
        byId: (id: string): Application<any> | undefined => {
            return this.idMap.hasOwnProperty(id) ? this.idMap[id] : undefined;
        }
    };

    readonly px: PrefixedApplication;

    readonly logger: LoggerInterface | undefined;
	readonly id: string
	readonly code: string
	readonly secret: string
	readonly name: string

    constructor(
		readonly  cfg: CfgType,
        readonly roles: RolesType,
        logger: LoggerInterface | ((app: Application<any>) => LoggerInterface) | undefined = undefined,
        private authorizeFunctions: Array<(req: Request, app: Application) => Promise<Authorizable | undefined | false>> = [],
    ) {
								this.code = cfg["app"]["code"].toUpperCase();
								this.id = cfg["app"]["id"];
								this.secret = cfg["app"]["secret"];
								this.name = cfg["app"]["name"];

        this.logger = typeof logger === "function" ? logger(this) : logger;
        this.px = new PrefixedApplication(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey) as RolesType[typeof roleKey];
        }
        Application.addApplication(this);

    };

    private static addApplication(application: Application<any>): void {
        if (this.codeMap.hasOwnProperty(application.code)) {
            throw GraphaneError.application.alreadyRegistered(application.code);
        }
        this.applications.push(application);
        this.codeMap[application.code] = application;
        this.idMap[application.id] = application;
    };

    async authorize(req: Request): Promise<Authorizable | undefined> {
        let result: Authorizable | undefined | false;
        for (const authorizeFunction of this.authorizeFunctions) {
            result = await authorizeFunction(req, this);
            if (result !== false) {
                return result;
            }
        }
        return undefined;
    };
}
