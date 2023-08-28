import Atom from "../carbonite/atom";
import LoggerInterface from "./loggerInteface";
import { PrefixedModule } from "./prefixed-module";
export default class Module<RolesType = {}, CfgType extends Record<string, any> = Record<string, any>> {
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
    readonly logger: LoggerInterface | null;
    readonly code: string;
    constructor(cfg: CfgType, logger: LoggerInterface | null | ((module: Module<any>) => LoggerInterface), roles: RolesType);
    constructor(code: string, logger: LoggerInterface | null | ((module: Module<any>) => LoggerInterface), roles: RolesType);
}
