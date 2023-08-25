import { ObjectTypeOptions } from "type-graphql";
import { EntityOptions } from "typeorm/decorator/options/EntityOptions";
import Atom from "../carbonite/atom";
import { Prefixed } from "./prefixed";
type GQLEntityOptions = {
    objectType?: ObjectTypeOptions;
    entity?: EntityOptions;
};
export type AtomClassDecorator = <TFunction extends typeof Atom>(target: TFunction) => void;
export declare class PrefixedModule extends Prefixed {
    GQLEntity(options?: GQLEntityOptions): AtomClassDecorator;
    Entity(options?: EntityOptions | undefined): AtomClassDecorator;
}
export {};
