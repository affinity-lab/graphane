import {Column} from "typeorm";
import Catalog from "./catalog";
import FileCrud from "./file-crud";
import FileAttachment from "./file/file-attachment";
import BasicCrud from "../../graphane/carbonite/crud";
import Atom from "../../graphane/carbonite/atom";


export default class AtomWithAttachments extends Atom {
	static crud: BasicCrud<AtomWithAttachments>;
	static fileCrud: FileCrud<AtomWithAttachments>;
	protected static catalogs: Record<string, (owner: AtomWithAttachments) => Catalog>;

	@Column({type: "json"}) attachments: Record<string, FileAttachment[]> = {};

	getCatalog(name: string): Catalog | undefined { return (this.constructor as typeof AtomWithAttachments).catalogs[name](this); }
}

