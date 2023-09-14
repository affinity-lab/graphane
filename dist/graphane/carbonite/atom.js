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
exports.Atom = exports.META = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let META = class META {
    constructor(module, entity, ident, catalogs = []) {
        this.catalogs = catalogs;
        this.ident = ident;
        this.module = module;
        this.entity = entity;
    }
    ;
};
exports.META = META;
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
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
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String, String, String, Array])
], META);
class Atom extends typeorm_1.BaseEntity {
    static get Ident() { return `${this.module}/${this.name}`; }
    ;
    get META() {
        return new META(this.constructor.module, this.constructor.name, `${this.constructor.module}/${this.constructor.name}/${this.id}`);
    }
    ;
}
exports.Atom = Atom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Atom.prototype, "id", void 0);
