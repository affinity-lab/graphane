class Graphane {
	public resolverDecorators: Array<MethodDecorator> = [];

	addResolverDecorator(decorator: MethodDecorator): void {this.resolverDecorators.push(decorator);};
}

const graphane: Graphane = new Graphane();

export default graphane;
