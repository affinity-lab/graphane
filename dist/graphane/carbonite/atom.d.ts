import { BaseEntity } from "typeorm";
import { BasicCrud } from "./crud";
export declare class Atom extends BaseEntity {
    static module: string;
    static crud: BasicCrud<Atom>;
    static get Ident(): string;
    id: number;
    get ident(): string;
    iasd: string;
}
