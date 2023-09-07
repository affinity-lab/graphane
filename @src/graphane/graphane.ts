class Graphane {
	public resolverDecoratorsAfter: Array<MethodDecorator> = [];
	public resolverDecoratorsBefore: Array<MethodDecorator> = [];

	addResolverDecoratorAfter(decorator: MethodDecorator): void {this.resolverDecoratorsAfter.push(decorator);};
	addResolverDecoratorBefore(decorator: MethodDecorator): void {this.resolverDecoratorsBefore.push(decorator);};
}

export const graphane: Graphane = new Graphane();
