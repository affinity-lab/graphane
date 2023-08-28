"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixedApplication = void 0;
const type_graphql_1 = require("type-graphql");
const decorators_1 = require("type-graphql/dist/helpers/decorators");
const validate_and_format_input_1 = require("../validate-and-format-input/validate-and-format-input");
const prefixed_1 = require("./prefixed");
class PrefixedApplication extends prefixed_1.Prefixed {
    Mutation(returnTypeFuncOrOptions, maybeOptions) {
        return this.QueryOrMutation(type_graphql_1.Mutation, returnTypeFuncOrOptions, maybeOptions);
    }
    Query(returnTypeFuncOrOptions, maybeOptions) {
        return this.QueryOrMutation(type_graphql_1.Query, returnTypeFuncOrOptions, maybeOptions);
    }
    InputType(options) {
        return (target) => {
            (0, type_graphql_1.InputType)(this.prefixer(target.name), options)(target);
        };
    }
    QueryOrMutation(which, returnTypeFuncOrOptions, maybeOptions) {
        let { middlewares, name } = this.createMiddlewares(which, false, returnTypeFuncOrOptions, maybeOptions);
        return (target, propertyKey, descriptor) => {
            if (typeof name == "undefined") {
                ({ middlewares, name } = this.createMiddlewares(which, this.prefixer(propertyKey.toString()), returnTypeFuncOrOptions, maybeOptions));
            }
            this.runMiddlewares(target, propertyKey, descriptor, middlewares);
        };
    }
    /**
     * The middlewares are run in the order they are in the list.
     */
    createMiddlewares(which, name, returnTypeFuncOrOptions, maybeOptions) {
        let { options, returnTypeFunc } = (0, decorators_1.getTypeDecoratorParams)(returnTypeFuncOrOptions, maybeOptions);
        if (options === undefined)
            options = {};
        if (typeof name === "string")
            options.name = name;
        const middlewares = [typeof returnTypeFunc == "undefined" ? which(options) : which(returnTypeFunc, options)];
        middlewares.push(validate_and_format_input_1.ValidateAndFormatInput);
        return { middlewares, name: options.name };
    }
    runMiddlewares(target, propertyKey, descriptor, middlewares) {
        for (let middleware of middlewares) {
            middleware(target, propertyKey, descriptor);
        }
    }
}
exports.PrefixedApplication = PrefixedApplication;
