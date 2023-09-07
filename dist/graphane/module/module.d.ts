import { Atom } from "../carbonite/atom";
import { PrefixedModule } from "./prefixed-module";
import { Env, Logger, ModuleLoggerFactory } from "../service-interfaces";
export type ModuleConfigType = {
    module: {
        code: string;
    };
    [key: string]: any;
};
export declare class Module<RolesType = {}, CfgType extends ModuleConfigType = ModuleConfigType> {
    readonly roles: RolesType;
    static modules: Module[];
    static codeMap: Record<string, Module>;
    static get(code: string): Module | null;
    static addEntity(code: string, entity: typeof Atom): void;
    private static addModule;
    static cfg(env: Env | null, code?: string): ModuleConfigType;
    entities: Record<string, typeof Atom>;
    readonly px: PrefixedModule;
    readonly logger: Logger | null;
    readonly code: string;
    readonly cfg: CfgType;
    constructor(cfg: CfgType, logger?: Logger | null | ModuleLoggerFactory, roles?: RolesType);
    constructor(code: string, logger?: Logger | null | ModuleLoggerFactory, roles?: RolesType);
}
