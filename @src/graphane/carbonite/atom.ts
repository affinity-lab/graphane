import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import {BasicCrud} from "./crud";
import {Field, ObjectType} from "type-graphql";


@ObjectType()
export class META {
	constructor(module: string, entityName: string, ident: string, catalogs: string[] = []) {
		this.catalogs = catalogs;
		this.ident = ident;
		this.module = module;
		this.entityName = entityName;
	};

	@Field(() => [String])
	catalogs?: string[];

	@Field()
	ident: string;

	@Field()
	module: string;

	@Field()
	entityName: string;
}

export class Atom extends BaseEntity {
	static module: string;
	static crud: BasicCrud<Atom>;
	static get Ident(): string {return `${this.module}/${this.name}`;};

	@PrimaryGeneratedColumn()
	id: number;

	get META(): META {
		return new META(
			(this.constructor as typeof Atom).module,
			this.constructor.name,
			`${(this.constructor as typeof Atom).module}/${this.constructor.name}/${this.id}`
		);
	};
}
