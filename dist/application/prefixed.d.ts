import { ObjectTypeOptions } from "type-graphql";
export declare class Prefixed {
    protected prefix: string;
    constructor(prefix: string);
    prefixer(name: string): string;
    ObjectType(options?: ObjectTypeOptions): ClassDecorator;
    protected readName(options: {
        name?: string;
    } | undefined, name: string): string;
}
