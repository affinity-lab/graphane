import { InputTypeOptions, Mutation, Query } from "type-graphql";
import { AdvancedOptions, ReturnTypeFunc } from "type-graphql/build/typings/decorators/types";
import { Prefixed } from "./prefixed";
export type EnhancedOptions = AdvancedOptions & {
    authorized?: string[] | boolean;
};
type cMReturnType = {
    middlewares: MethodDecorator[];
    name: string | undefined;
};
export declare class PrefixedApplication extends Prefixed {
    constructor(prefix: string);
    Mutation(): MethodDecorator;
    Mutation(options: EnhancedOptions): MethodDecorator;
    Mutation(returnTypeFunc: ReturnTypeFunc, options?: EnhancedOptions): MethodDecorator;
    Query(): MethodDecorator;
    Query(options: EnhancedOptions): MethodDecorator;
    Query(returnTypeFunc: ReturnTypeFunc, options?: EnhancedOptions): MethodDecorator;
    InputType(options?: InputTypeOptions): ClassDecorator;
    protected QueryOrMutation(which: typeof Query | typeof Mutation, returnTypeFuncOrOptions?: ReturnTypeFunc | EnhancedOptions, maybeOptions?: EnhancedOptions): MethodDecorator;
    /**
     * The middlewares are run in the order they are in the list.
     */
    protected createMiddlewares(which: typeof Query | typeof Mutation, name: string | false, returnTypeFuncOrOptions?: ReturnTypeFunc | EnhancedOptions, maybeOptions?: EnhancedOptions): cMReturnType;
    protected runMiddlewares<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>, middlewares: MethodDecorator[]): void;
}
export {};
