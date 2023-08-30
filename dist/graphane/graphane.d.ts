declare class Graphane {
    resolverDecorators: Array<MethodDecorator>;
    addResolverDecorator(decorator: MethodDecorator): void;
}
declare const graphane: Graphane;
export default graphane;
