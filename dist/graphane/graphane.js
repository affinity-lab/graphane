"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphane = void 0;
class Graphane {
    constructor() {
        this.resolverDecoratorsAfter = [];
        this.resolverDecoratorsBefore = [];
    }
    addResolverDecoratorAfter(decorator) { this.resolverDecoratorsAfter.push(decorator); }
    ;
    addResolverDecoratorBefore(decorator) { this.resolverDecoratorsBefore.push(decorator); }
    ;
}
exports.graphane = new Graphane();
