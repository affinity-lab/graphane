import Atom from "../carbonite/atom";
import { PrefixedModule } from "./prefixed-module";
import { Logger, ModuleLoggerFactory } from "./service-interfaces/service-interfaces";
export type ModuleConfigType = {
    module: {
        code: string;
    };
    [key: string]: any;
};
export default class Module<RolesType = {}, CfgType extends ModuleConfigType = ModuleConfigType> {
    readonly roles: RolesType;
    static modules: Module[];
    static codeMap: {
        [p: string]: Module<any>;
    };
    static get(code: string): Module | null;
    static addEntity(code: string, entity: typeof Atom): void;
    private static addModule;
    entities: Record<string, typeof Atom>;
    readonly px: PrefixedModule;
    readonly logger: Logger | null;
    readonly code: string;
    readonly cfg: CfgType;
    constructor(cfg: CfgType, logger: Logger | null | ModuleLoggerFactory, roles: RolesType);
    constructor(code: string, logger: Logger | null | ModuleLoggerFactory, roles: RolesType);
}
