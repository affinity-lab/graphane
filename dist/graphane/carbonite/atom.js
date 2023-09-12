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
exports.Atom = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const materialize_it_1 = require("../../util/materialize-it");
class Atom extends typeorm_1.BaseEntity {
    static get Ident() { return `${this.module}/${this.name}`; }
    ;
    get ident() { return `${this.constructor.module}/${this.constructor.name}/${this.id}`; }
    ;
}
exports.Atom = Atom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Atom.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, materialize_it_1.MaterializeIt)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Atom.prototype, "ident", null);
