import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import {BasicCrud} from "./crud";


export class Atom extends BaseEntity {
	static module: string;
	static crud: BasicCrud<Atom>;
	static get Ident(): string {return `${this.module}/${this.name}`;};

	@PrimaryGeneratedColumn()
	id: number;

	get META(): Record<string, string | string[] | number> {
		return {
			ident: `${(this.constructor as typeof Atom).module}/${this.constructor.name}/${this.id}`,
			module: (this.constructor as typeof Atom).module,
			entity: this.constructor.name
		};
	};
}
