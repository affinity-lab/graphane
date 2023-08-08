import {ObjectType} from "type-graphql";
import {ObjectTypeOptions} from "type-graphql/dist/decorators/ObjectType";


export class Prefixed {
    constructor(protected prefix: string) {
    };

    prefixer(name: string): string {
        return `${this.prefix}_${name}`;
    };

    ObjectType(options?: ObjectTypeOptions): ClassDecorator {
        return <TFunction extends Function>(target: TFunction): void => {
            ObjectType(this.prefixer(target.name), options)(target);
        };
    };

    protected readName(options: {name?: string} | undefined, name: string): string {
        return options !== undefined && options.name !== undefined ? options.name : name;
    };
}
