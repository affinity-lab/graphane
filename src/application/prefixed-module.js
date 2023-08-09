"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixedModule = void 0;
const snake_case_1 = require("snake-case");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const module_1 = __importDefault(require("./module"));
const prefixed_1 = require("./prefixed");
class PrefixedModule extends prefixed_1.Prefixed {
    GQLEntity(options) {
        const entity = this.Entity(options?.entity);
        const field = (0, type_graphql_1.Field)(() => type_graphql_1.ID);
        const objectType = this.ObjectType(options?.objectType);
        return (target) => {
            entity(target);
            field(target.prototype, "id");
            objectType(target);
        };
    }
    ;
    Entity(options) {
        return (target) => {
            module_1.default.addEntity(this.prefix, target);
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
