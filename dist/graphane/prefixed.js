"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prefixed = void 0;
const type_graphql_1 = require("type-graphql");
class Prefixed {
    constructor(prefix) {
        this.prefix = prefix;
    }
    ;
    prefixer(name) { return `${this.prefix}_${name}`; }
    ;
    ObjectType(options) {
        return (target) => {
            (0, type_graphql_1.ObjectType)(this.prefixer(target.name), options)(target);
        };
    }
    ;
    readName(options, name) { return options !== undefined && options.name !== undefined ? options.name : name; }
    ;
}
exports.Prefixed = Prefixed;
