class Graphane {
	public resolverDecorators: Array<MethodDecorator> = [];

	addResolverDecorator(decorator: MethodDecorator): void {this.resolverDecorators.push(decorator);};
}

export const graphane: Graphane = new Graphane();
