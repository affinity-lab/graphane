import { ObjectTypeOptions } from "type-graphql/dist/decorators/ObjectType";
export declare class Prefixed {
    protected prefix: string;
    constructor(prefix: string);
    prefixer(name: string): string;
    ObjectType(options?: ObjectTypeOptions): ClassDecorator;
    protected readName(options: {
        name?: string;
    } | undefined, name: string): string;
}
