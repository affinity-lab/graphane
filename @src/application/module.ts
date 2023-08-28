import Atom from "../carbonite/atom";
import GraphaneError from "../error/graphane-error";
import LoggerInterface from "./loggerInteface";
import {PrefixedModule} from "./prefixed-module";
import requiredProperties from "../util/required-properties";


export default class Module<RolesType = {}, CfgType extends Record<string, any> = Record<string, any>> {

	static modules: Module[] = [];
	static codeMap: { [p: string]: Module<any> } = {};
	static get(code: string): Module | null {return this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : null;}

	public static addEntity(code: string, entity: typeof Atom): void {this.codeMap[code].entities[entity.name] = entity;}
	private static addModule(module: Module<any>): void {
		if (this.codeMap.hasOwnProperty(module.code)) {
			throw GraphaneError.module.alreadyRegistered(module.code);
		}
		this.modules.push(module);
		this.codeMap[module.code] = module;
	}


	public entities: Record<string, typeof Atom> = {};
	readonly px: PrefixedModule;
	readonly logger: LoggerInterface | null;
	readonly code: string;


	constructor(cfg: CfgType, logger: LoggerInterface | null | ((module: Module<any>) => LoggerInterface), roles: RolesType);
	constructor(code: string, logger: LoggerInterface | null | ((module: Module<any>) => LoggerInterface), roles: RolesType);
	constructor(cfg: CfgType | string, logger: LoggerInterface | null | ((module: Module<any>) => LoggerInterface) = null, readonly roles: RolesType = {} as RolesType) {
		if (typeof cfg === "string") {
			this.code = cfg;
		} else {
			if (!requiredProperties(cfg, "module") || !requiredProperties(cfg.module, "code")) throw GraphaneError.fatal(`Module config does not have the required keys`);
			this.code = cfg["module"]["code"].toUpperCase();
		}

		this.px = new PrefixedModule(this.code);
		for (const roleKey in this.roles) {
			this.roles[roleKey] = this.px.prefixer(roleKey) as unknown as RolesType[typeof roleKey];
		}
		this.logger = typeof logger === "function" ? logger(this) : logger;
		Module.addModule(this);
	}

}
