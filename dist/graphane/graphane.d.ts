declare class Graphane {
    resolverDecoratorsAfter: Array<MethodDecorator>;
    resolverDecoratorsBefore: Array<MethodDecorator>;
    addResolverDecoratorAfter(decorator: MethodDecorator): void;
    addResolverDecoratorBefore(decorator: MethodDecorator): void;
}
export declare const graphane: Graphane;
export {};
