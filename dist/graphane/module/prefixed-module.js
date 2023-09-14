"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixedModule = void 0;
const snake_case_1 = require("snake-case");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const atom_1 = require("../carbonite/atom");
const module_1 = require("./module");
const prefixed_1 = require("../prefixed");
class PrefixedModule extends prefixed_1.Prefixed {
    GQLEntity(options) {
        const entity = this.Entity(options?.entity);
        const idField = (0, type_graphql_1.Field)(() => type_graphql_1.ID);
        const metaField = (0, type_graphql_1.Field)(() => atom_1.META);
        const objectType = this.ObjectType(options?.objectType);
        return (target) => {
            entity(target);
            idField(target.prototype, "id");
            metaField(target.prototype, "META");
            objectType(target);
        };
    }
    ;
    Entity(options) {
        return (target) => {
            module_1.Module.addEntity(this.prefix, target);
            (0, typeorm_1.Entity)((0, snake_case_1.snakeCase)(this.prefixer(this.readName(options, target.name))), options)(target);
            Object.defineProperty(target, "module", {
                value: this.prefix,
                writable: false
            });
        };
    }
    ;
}
exports.PrefixedModule = PrefixedModule;
