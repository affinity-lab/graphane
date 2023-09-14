import {Column} from "typeorm";
import {Catalog} from "./catalog";
import {FileCrud} from "./file-crud";
import {FileAttachment} from "./file/file-attachment";
import {BasicCrud} from "../../graphane/carbonite/crud";
import {Atom, META} from "../../graphane/carbonite/atom";


export class AtomWithAttachments extends Atom {
	static crud: BasicCrud<AtomWithAttachments>;
	static fileCrud: FileCrud<AtomWithAttachments>;
	protected static catalogs: Record<string, (owner: AtomWithAttachments) => Catalog>;

	@Column({type: "json"})
	attachments: Record<string, FileAttachment[]> = {};

	getCatalog(name: string): Catalog | undefined {return (this.constructor as typeof AtomWithAttachments).catalogs[name](this);};

	get META(): META {
		const result: META = super.META;
		result.catalogs = Object.keys((this.constructor as typeof AtomWithAttachments).catalogs);
		return result;
	};
}
