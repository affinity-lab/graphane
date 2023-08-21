import Atom from "@src/carbonite/atom";
import LoggerInterface from "./loggerInteface";
import { PrefixedModule } from "./prefixed-module";
export default class Module<RolesType = {}> {
    readonly code: string;
    readonly roles: RolesType;
    static modules: Module[];
    static codeMap: {
        [p: string]: Module<any>;
    };
    entities: Record<string, typeof Atom>;
    readonly px: PrefixedModule;
    readonly logger: LoggerInterface | null;
    constructor(code: string, logger?: LoggerInterface | null | ((module: Module<any>) => LoggerInterface), roles?: RolesType);
    static addEntity(code: string, entity: typeof Atom): void;
    static get(code: string): Module | null;
    private static addModule;
}
