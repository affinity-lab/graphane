import { Catalog } from "./catalog";
import { FileCrud } from "./file-crud";
import { FileAttachment } from "./file/file-attachment";
import { BasicCrud } from "../../graphane/carbonite/crud";
import { Atom, META } from "../../graphane/carbonite/atom";
export type CatalogFactory = (owner: AtomWithAttachments) => Catalog;
export declare class AtomWithAttachments extends Atom {
    static crud: BasicCrud<AtomWithAttachments>;
    static fileCrud: FileCrud<AtomWithAttachments>;
    protected static catalogs: Record<string, CatalogFactory>;
    attachments: Record<string, FileAttachment[]>;
    getCatalog(name: string): Catalog | undefined;
    get META(): META;
}
