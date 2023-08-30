import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import BasicCrud from "./crud";


export default class Atom extends BaseEntity {
	static module: string;
	static crud: BasicCrud<Atom>;
	static get Ident(): string {return `${this.module}/${this.name}`;};

	@PrimaryGeneratedColumn()
	id: number;

	get ident(): string {return `${(this.constructor as typeof Atom).module}/${this.constructor.name}/${this.id}`;};
}
