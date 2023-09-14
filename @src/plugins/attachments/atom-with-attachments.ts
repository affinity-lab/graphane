import {Column} from "typeorm";
import {Catalog} from "./catalog";
import {FileCrud} from "./file-crud";
import {FileAttachment} from "./file/file-attachment";
import {BasicCrud} from "../../graphane/carbonite/crud";
import {Atom, META} from "../../graphane/carbonite/atom";


export type CatalogFactory = (owner: AtomWithAttachments) => Catalog;

export class AtomWithAttachments extends Atom {
	static crud: BasicCrud<AtomWithAttachments>;
	static fileCrud: FileCrud<AtomWithAttachments>;
	protected static catalogs: Record<string, CatalogFactory>;

	@Column({type: "json"})
	attachments: Record<string, FileAttachment[]> = {};

	getCatalog(name: string): Catalog | undefined {
		const func: CatalogFactory | undefined = (this.constructor as typeof AtomWithAttachments).catalogs[name];
		return func === undefined ? undefined : func(this);
	};

	get META(): META {
		const result: META = super.META;
		result.catalogs = Object.keys((this.constructor as typeof AtomWithAttachments).catalogs);
		return result;
	};
}
