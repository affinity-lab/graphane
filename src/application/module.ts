import ModuleAlreadyRegisteredError from "./errors/module-already-registered-error";
import Atom from "../carbonite/atom";
import LoggerInterface from "./loggerInteface";
import {PrefixedModule} from "./prefixed-module";


export default class Module<RolesType = {}> {
    static modules: Module[] = [];

    static codeMap: {[p: string]: Module<any>} = {};

    public entities: Record<string, typeof Atom> = {};

    readonly px: PrefixedModule;

    readonly logger: LoggerInterface | null;

    constructor(readonly code: string, logger: LoggerInterface | null | ((module: Module<any>) => LoggerInterface) = null, readonly roles: RolesType = {} as RolesType) {
        this.code = this.code.toUpperCase();
        this.px = new PrefixedModule(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey) as unknown as RolesType[typeof roleKey];
        }
        this.logger = typeof logger === "function" ? logger(this) : logger;
        Module.addModule(this);
    };

    public static addEntity(code: string, entity: typeof Atom): void {
        this.codeMap[code].entities[entity.name] = entity;
    };

    static get(code: string): Module | null {
        return this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : null;
    };

    private static addModule(module: Module<any>): void {
        if (this.codeMap.hasOwnProperty(module.code)) {
            throw new ModuleAlreadyRegisteredError(module.code);
        }
        this.modules.push(module);
        this.codeMap[module.code] = module;
    };
}
