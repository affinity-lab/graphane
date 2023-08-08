import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";
import Catalog from "./attachments/catalog";
import FileCrud from "./attachments/file-crud";
import FileAttachment from "./attachments/file/file-attachment";
import {BasicCrud} from "./crud";


export default class Atom extends BaseEntity {
    static module: string;

    static crud: BasicCrud<Atom>;

    @PrimaryGeneratedColumn()
    id: number;

    static get Ident(): string {
        return `${this.module}/${this.name}`;
    };

    get ident(): string {
        return `${(this.constructor as typeof Atom).module}/${this.constructor.name}/${this.id}`;
    };
}

export class AtomWithAttachments extends Atom {
    static crud: BasicCrud<AtomWithAttachments>;

    static fileCrud: FileCrud<AtomWithAttachments>;

    protected static catalogs: Record<string, (owner: AtomWithAttachments) => Catalog>;

    @Column({type: "json"})
    attachments: Record<string, FileAttachment[]> = {};

    getCatalog(name: string): Catalog | undefined {
        return (this.constructor as typeof AtomWithAttachments).catalogs[name](this);
    };
}
