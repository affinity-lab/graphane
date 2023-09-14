"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixedModule = exports.META = void 0;
const snake_case_1 = require("snake-case");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const module_1 = require("./module");
const prefixed_1 = require("../prefixed");
const type_1 = require("graphql/type");
let META = class META extends type_1.GraphQLScalarType {
};
exports.META = META;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], META.prototype, "catalogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], META.prototype, "ident", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], META.prototype, "module", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], META.prototype, "entity", void 0);
exports.META = META = __decorate([
    (0, type_graphql_1.ObjectType)()
], META);
class PrefixedModule extends prefixed_1.Prefixed {
    GQLEntity(options) {
        const entity = this.Entity(options?.entity);
        const idField = (0, type_graphql_1.Field)(() => type_graphql_1.ID);
        const metaField = (0, type_graphql_1.Field)(() => META);
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
