import {InputType, InputTypeOptions, Mutation, Query} from "type-graphql";
import {AdvancedOptions, ReturnTypeFunc} from "type-graphql/dist/decorators/types";
import {getTypeDecoratorParams} from "type-graphql/dist/helpers/decorators";
import {Prefixed} from "../prefixed";
import graphane from "../graphane";


type cMReturnType = {
	middlewares: MethodDecorator[],
	name: string | undefined
};


export class PrefixedApplication extends Prefixed {
	Mutation(): MethodDecorator;
	Mutation(options: AdvancedOptions): MethodDecorator;
	Mutation(returnTypeFunc: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
	Mutation(returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions, maybeOptions?: AdvancedOptions): MethodDecorator {
		return this.QueryOrMutation(Mutation, returnTypeFuncOrOptions, maybeOptions);
	}

	Query(): MethodDecorator;
	Query(options: AdvancedOptions): MethodDecorator;
	Query(returnTypeFunc: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
	Query(returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions, maybeOptions?: AdvancedOptions): MethodDecorator {
		return this.QueryOrMutation(Query, returnTypeFuncOrOptions, maybeOptions);
	}

	InputType(options?: InputTypeOptions): ClassDecorator {
		return <TFunction extends Function>(target: TFunction): void => {
			InputType(this.prefixer(target.name), options)(target);
		};
	}

	protected QueryOrMutation(which: typeof Query | typeof Mutation, returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions, maybeOptions?: AdvancedOptions): MethodDecorator {
		let {middlewares, name}: cMReturnType = this.createMiddlewares(which, false, returnTypeFuncOrOptions, maybeOptions);
		return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void => {
			if (typeof name == "undefined") {
				({middlewares, name} = this.createMiddlewares(which, this.prefixer(propertyKey.toString()), returnTypeFuncOrOptions, maybeOptions));
			}
			this.runMiddlewares(target, propertyKey, descriptor, middlewares);
		};
	}

	/**
	 * The middlewares are run in the order they are in the list.
	 */
	protected createMiddlewares(which: typeof Query | typeof Mutation, name: string | false, returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions, maybeOptions?: AdvancedOptions): cMReturnType {
		let {options, returnTypeFunc}: {
			options: Partial<AdvancedOptions>,
			returnTypeFunc?: ReturnTypeFunc
		} = getTypeDecoratorParams(returnTypeFuncOrOptions, maybeOptions);
		if (options === undefined) options = {};
		if (typeof name === "string") options.name = name;
		const middlewares: MethodDecorator[] = [typeof returnTypeFunc == "undefined" ? which(options) : which(returnTypeFunc, options)];
		middlewares.push(...graphane.resolverDecorators);
		return {middlewares, name: options.name};
	}

	protected runMiddlewares<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>, middlewares: MethodDecorator[]): void {
		for (let middleware of middlewares) {
			middleware(target, propertyKey, descriptor);
		}
	}
}
