import {snakeCase} from "snake-case";
import {Field, ID, ObjectTypeOptions} from "type-graphql";
import {MethodAndPropDecorator} from "type-graphql/dist/decorators/types";
import {Entity} from "typeorm";
import {EntityOptions} from "typeorm/decorator/options/EntityOptions";
import Atom from "../carbonite/atom";
import Module from "./module";
import {Prefixed} from "../prefixed";


type GQLEntityOptions = { objectType?: ObjectTypeOptions, entity?: EntityOptions };

export type AtomClassDecorator = <TFunction extends typeof Atom>(target: TFunction) => void;

export class PrefixedModule extends Prefixed {
	GQLEntity(options?: GQLEntityOptions): AtomClassDecorator {
		const entity: AtomClassDecorator = this.Entity(options?.entity);
		const field: MethodAndPropDecorator = Field(() => ID);
		const objectType: AtomClassDecorator = this.ObjectType(options?.objectType);
		return <TFunction extends typeof Atom>(target: TFunction): void => {
			entity(target);
			field(target.prototype, "id");
			objectType<typeof Atom>(target);
		};
	}

	Entity(options?: EntityOptions | undefined): AtomClassDecorator {
		return <TFunction extends typeof Atom>(target: TFunction): void => {
			Module.addEntity(this.prefix, target);
			Entity(snakeCase(this.prefixer(this.readName(options, target.name))), options)(target);
			Object.defineProperty(target, "module", {
				value: this.prefix,
				writable: false
			});
		};
	}
}
