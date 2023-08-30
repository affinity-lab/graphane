import {Atom} from "../carbonite/atom";
import {GraphaneError} from "../graphane-error";
import {PrefixedModule} from "./prefixed-module";
import {requiredProperties} from "../../util/required-properties";
import {Env, Logger, ModuleLoggerFactory} from "../service-interfaces";
import {fatalError} from "../../error/fatal-error";


export type ModuleConfigType = {
	module: {
		code: string;
	};
	[key: string]: any;
};

export class Module<RolesType = {}, CfgType extends ModuleConfigType = ModuleConfigType> {
	static modules: Module[] = [];
	static codeMap: Record<string, Module> = {};

	static get(code: string): Module | null {return this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : null;};

	public static addEntity(code: string, entity: typeof Atom): void {this.codeMap[code].entities[entity.name] = entity;};

	private static addModule(module: Module<any>): void {
		if (this.codeMap.hasOwnProperty(module.code)) {
			throw GraphaneError.module.alreadyRegistered(module.code);
		}
		this.modules.push(module);
		this.codeMap[module.code] = module;
	};

	static cfg(env: Env | null, code?: string): ModuleConfigType {
		if (code === undefined) {
			if (env === null) throw fatalError();
			code = env.string("CODE");
		}
		return {module: {code}};
	};

	public entities: Record<string, typeof Atom> = {};
	readonly px: PrefixedModule;
	readonly logger: Logger | null;
	readonly code: string;
	readonly cfg: CfgType;

	constructor(cfg: CfgType, logger?: Logger | null | ModuleLoggerFactory, roles?: RolesType);
	constructor(code: string, logger?: Logger | null | ModuleLoggerFactory, roles?: RolesType);
	constructor(cfg: CfgType | string, logger: Logger | null | ModuleLoggerFactory = null, readonly roles: RolesType = {} as RolesType) {
		let config: ModuleConfigType;
		if (typeof cfg === "string") {
			this.code = cfg;
			config = Module.cfg(null, cfg);
		} else {
			config = cfg;
		}
		if (!requiredProperties(config, "module") || !requiredProperties(config.module, "code")) throw fatalError(`Module config does not have the required keys`);
		this.code = config["module"]["code"].toUpperCase();
		this.cfg = config as CfgType;
		this.px = new PrefixedModule(this.code);
		for (const roleKey in this.roles) {
			this.roles[roleKey] = this.px.prefixer(roleKey) as unknown as RolesType[typeof roleKey];
		}
		this.logger = typeof logger === "function" ? logger(this) : logger;
		Module.addModule(this);
	};
}
