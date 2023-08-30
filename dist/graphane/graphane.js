"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graphane {
    constructor() {
        this.resolverDecorators = [];
    }
    addResolverDecorator(decorator) { this.resolverDecorators.push(decorator); }
}
const graphane = new Graphane();
exports.default = graphane;
