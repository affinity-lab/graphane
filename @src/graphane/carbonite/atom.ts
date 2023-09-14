import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import {BasicCrud} from "./crud";
import {Field} from "type-graphql";


export class Atom extends BaseEntity {
	static module: string;
	static crud: BasicCrud<Atom>;
	static get Ident(): string {return `${this.module}/${this.name}`;};

	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	get ident(): string {return `${(this.constructor as typeof Atom).module}/${this.constructor.name}/${this.id}`;};

	@Field(() => String, {description: "for testing, why?"})
	testProp: string = "testProp";
}
