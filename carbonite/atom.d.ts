import { BaseEntity } from "typeorm";
import Catalog from "./attachments/catalog";
import FileCrud from "./attachments/file-crud";
import FileAttachment from "./attachments/file/file-attachment";
import { BasicCrud } from "./crud";
export default class Atom extends BaseEntity {
    static module: string;
    static crud: BasicCrud<Atom>;
    static get Ident(): string;
    id: number;
    get ident(): string;
}
export declare class AtomWithAttachments extends Atom {
    static crud: BasicCrud<AtomWithAttachments>;
    static fileCrud: FileCrud<AtomWithAttachments>;
    protected static catalogs: Record<string, (owner: AtomWithAttachments) => Catalog>;
    attachments: Record<string, FileAttachment[]>;
    getCatalog(name: string): Catalog | undefined;
}
