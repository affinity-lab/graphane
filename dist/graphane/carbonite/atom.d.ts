import { BaseEntity } from "typeorm";
import { BasicCrud } from "./crud";
export declare class META {
    constructor(module: string, entity: string, ident: string, catalogs?: string[]);
    catalogs?: string[];
    ident: string;
    module: string;
    entity: string;
}
export declare class Atom extends BaseEntity {
    static module: string;
    static crud: BasicCrud<Atom>;
    static get Ident(): string;
    id: number;
    get META(): META;
}
