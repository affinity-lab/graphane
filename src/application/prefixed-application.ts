import {Authorized, InputType, InputTypeOptions, Mutation, Query} from "type-graphql";
import {AdvancedOptions, ReturnTypeFunc} from "type-graphql/dist/decorators/types";
import {getTypeDecoratorParams} from "type-graphql/dist/helpers/decorators";
import {ValidateAndFormatInput} from "../validate-and-format-input/validate-and-format-input";
import {Prefixed} from "./prefixed";


export type EnhancedOptions = AdvancedOptions & {authorized?: string[] | boolean};

type cMReturnType = {
    middlewares: MethodDecorator[],
    name: string | undefined
};


export class PrefixedApplication extends Prefixed {
    constructor(prefix: string) {
        super(prefix);
    };

    Mutation(): MethodDecorator;
    Mutation(options: EnhancedOptions): MethodDecorator;
    Mutation(returnTypeFunc: ReturnTypeFunc, options?: EnhancedOptions): MethodDecorator;
    Mutation(returnTypeFuncOrOptions?: ReturnTypeFunc | EnhancedOptions, maybeOptions?: EnhancedOptions): MethodDecorator {
        return this.QueryOrMutation(Mutation, returnTypeFuncOrOptions, maybeOptions);
    };

    Query(): MethodDecorator;
    Query(options: EnhancedOptions): MethodDecorator;
    Query(returnTypeFunc: ReturnTypeFunc, options?: EnhancedOptions): MethodDecorator;
    Query(returnTypeFuncOrOptions?: ReturnTypeFunc | EnhancedOptions, maybeOptions?: EnhancedOptions): MethodDecorator {
        return this.QueryOrMutation(Query, returnTypeFuncOrOptions, maybeOptions);
    };

    InputType(options?: InputTypeOptions): ClassDecorator {
        return <TFunction extends Function>(target: TFunction): void => {
            InputType(this.prefixer(target.name), options)(target);
        };
    };

    protected QueryOrMutation(which: typeof Query | typeof Mutation, returnTypeFuncOrOptions?: ReturnTypeFunc | EnhancedOptions, maybeOptions?: EnhancedOptions): MethodDecorator {
        let {
            middlewares,
            name
        }: cMReturnType = this.createMiddlewares(which, false, returnTypeFuncOrOptions, maybeOptions);
        return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void => {
            if (typeof name == "undefined") {
                ({
                    middlewares,
                    name
                } = this.createMiddlewares(which, this.prefixer(propertyKey.toString()), returnTypeFuncOrOptions, maybeOptions));
            }
            this.runMiddlewares(target, propertyKey, descriptor, middlewares);
        };
    };

    /**
     * The middlewares are run in the order they are in the list.
     */
    protected createMiddlewares(which: typeof Query | typeof Mutation, name: string | false, returnTypeFuncOrOptions?: ReturnTypeFunc | EnhancedOptions, maybeOptions?: EnhancedOptions): cMReturnType {
        let {options, returnTypeFunc}: {
            options: Partial<EnhancedOptions>,
            returnTypeFunc?: ReturnTypeFunc
        } = getTypeDecoratorParams(returnTypeFuncOrOptions, maybeOptions);
        if (options === undefined) {
            options = {};
        }
        if (typeof name === "string") {
            options.name = name;
        }
        const middlewares: MethodDecorator[] = [typeof returnTypeFunc == "undefined" ? which(options) : which(returnTypeFunc, options)];
        if (typeof options.authorized !== "undefined" && options.authorized !== false) {
            middlewares.push(options.authorized === true ? Authorized([]) : Authorized(options.authorized));
        }
        middlewares.push(ValidateAndFormatInput);
        return {middlewares, name: options.name};
    };

    protected runMiddlewares<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>, middlewares: MethodDecorator[]): void {
        for (let middleware of middlewares) {
            middleware(target, propertyKey, descriptor);
        }
    };
}
