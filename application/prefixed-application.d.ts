import { InputTypeOptions, Mutation, Query } from "type-graphql";
import { AdvancedOptions, ReturnTypeFunc } from "type-graphql/dist/decorators/types";
import { Prefixed } from "./prefixed";
type cMReturnType = {
    middlewares: MethodDecorator[];
    name: string | undefined;
};
export declare class PrefixedApplication extends Prefixed {
    Mutation(): MethodDecorator;
    Mutation(options: AdvancedOptions): MethodDecorator;
    Mutation(returnTypeFunc: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
    Query(): MethodDecorator;
    Query(options: AdvancedOptions): MethodDecorator;
    Query(returnTypeFunc: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
    InputType(options?: InputTypeOptions): ClassDecorator;
    protected QueryOrMutation(which: typeof Query | typeof Mutation, returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions, maybeOptions?: AdvancedOptions): MethodDecorator;
    /**
     * The middlewares are run in the order they are in the list.
     */
    protected createMiddlewares(which: typeof Query | typeof Mutation, name: string | false, returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions, maybeOptions?: AdvancedOptions): cMReturnType;
    protected runMiddlewares<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>, middlewares: MethodDecorator[]): void;
}
export {};
