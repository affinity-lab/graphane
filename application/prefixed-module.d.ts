import Atom from "../carbonite/atom";
import { ObjectTypeOptions } from "type-graphql/dist/decorators/ObjectType";
import { EntityOptions } from "typeorm/decorator/options/EntityOptions";
import { Prefixed } from "./prefixed";
declare type GQLEntityOptions = {
    objectType?: ObjectTypeOptions;
    entity?: EntityOptions;
};
export declare type AtomClassDecorator = <TFunction extends typeof Atom>(target: TFunction) => void;
export declare class PrefixedModule extends Prefixed {
    GQLEntity(options?: GQLEntityOptions): AtomClassDecorator;
    Entity(options?: EntityOptions | undefined): AtomClassDecorator;
}
export {};
