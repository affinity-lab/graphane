class Graphane {
	public resolverDecorators: Array<MethodDecorator> = [];
	addResolverDecorator(decorator: MethodDecorator) {this.resolverDecorators.push(decorator);}
}

const graphane = new Graphane();
export default graphane;