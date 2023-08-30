import GraphaneError from "../graphane-error";
import {Request} from "express";
import {PrefixedApplication} from "./prefixed-application";
import requiredProperties from "../../util/required-properties";
import {ApplicationLoggerFactory, Env, Jwt, JwtFactory, Logger} from "../service-interfaces";
import fatal from "../../error/fatal";


type ApplicationMiddleware = (req: Request, app: Application) => Promise<any>;

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

	private static addApplication(application: Application<any>): void {
		if (this.codeMap.hasOwnProperty(application.code)) {
			throw GraphaneError.application.alreadyRegistered(application.code);
		}
		this.applications.push(application);
		this.codeMap[application.code] = application;
		this.idMap[application.id] = application;
	};

	static cfg(env: Env, code?: string) {
		if (code === undefined) code = env.string("CODE");
		return {
			app: {
				id: env.string("ID"),
				code,
				secret: env.string("SECRET"),
				name: env.string("NAME", code)
			}
		};
	};

	readonly px: PrefixedApplication;
	readonly logger: Logger | undefined;
	readonly id: string;
	readonly code: string;
	readonly secret: string;
	readonly name: string;
	readonly jwt: Jwt<any>;

	constructor(
		readonly cfg: CfgType,
		readonly roles: RolesType,
		logger: Logger | ApplicationLoggerFactory | undefined = undefined,
		private readonly jwtFactory: JwtFactory,
		private middlewares: Array<ApplicationMiddleware> = []
	) {
		if (!requiredProperties(cfg, "app") || !requiredProperties(cfg.app, "code", "id", "secret", "name")) throw fatal(`App config does not have the required keys`);

		this.code = cfg["app"]["code"].toUpperCase();
		this.id = cfg["app"]["id"];
		this.secret = cfg["app"]["secret"];
		this.name = cfg["app"]["name"];
		this.logger = typeof logger === "function" ? logger(this) : logger;
		this.px = new PrefixedApplication(this.code);
		for (const roleKey in this.roles) {
			this.roles[roleKey] = this.px.prefixer(roleKey) as RolesType[typeof roleKey];
		}
		this.jwt = this.jwtFactory<any>(this.secret);
		Application.addApplication(this);
	};

	async runMiddlewares(req: Request): Promise<void> {for (const middleware of this.middlewares) await middleware(req, this);};
}
