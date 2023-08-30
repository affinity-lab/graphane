"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphane = void 0;
class Graphane {
    constructor() {
        this.resolverDecorators = [];
    }
    addResolverDecorator(decorator) { this.resolverDecorators.push(decorator); }
    ;
}
exports.graphane = new Graphane();
