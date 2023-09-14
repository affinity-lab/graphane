import {snakeCase} from "snake-case";
import {Field, ID, ObjectType, ObjectTypeOptions} from "type-graphql";
import {MethodAndPropDecorator} from "type-graphql/dist/decorators/types";
import {Entity} from "typeorm";
import {EntityOptions} from "typeorm/decorator/options/EntityOptions";
import {Atom} from "../carbonite/atom";
import {Module} from "./module";
import {Prefixed} from "../prefixed";
import {GraphQLScalarType} from "graphql/type";


type GQLEntityOptions = {objectType?: ObjectTypeOptions, entity?: EntityOptions};

export type AtomClassDecorator = <TFunction extends typeof Atom>(target: TFunction) => void;

@ObjectType()
export class META extends GraphQLScalarType {
	@Field()
	catalogs?: string[];

	@Field()
	ident: string;

	@Field()
	module: string;

	@Field()
	entity: string;
}

export class PrefixedModule extends Prefixed {
	GQLEntity(options?: GQLEntityOptions): AtomClassDecorator {
		const entity: AtomClassDecorator = this.Entity(options?.entity);
		const idField: MethodAndPropDecorator = Field(() => ID);
		const metaField: MethodAndPropDecorator = Field(() => META);
		const objectType: AtomClassDecorator = this.ObjectType(options?.objectType);
		return <TFunction extends typeof Atom>(target: TFunction): void => {
			entity(target);
			idField(target.prototype, "id");
			metaField(target.prototype, "META");
			objectType<typeof Atom>(target);
		};
	};

	Entity(options?: EntityOptions | undefined): AtomClassDecorator {
		return <TFunction extends typeof Atom>(target: TFunction): void => {
			Module.addEntity(this.prefix, target);
			Entity(snakeCase(this.prefixer(this.readName(options, target.name))), options)(target);
			Object.defineProperty(target, "module", {
				value: this.prefix,
				writable: false
			});
		};
	};
}
