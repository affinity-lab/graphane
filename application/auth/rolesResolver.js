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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRolesResolver = void 0;
const graphql_type_json_1 = require("graphql-type-json");
const type_graphql_1 = require("type-graphql");
const context_1 = require("../../server/context");
let Roles = class Roles {
    constructor(roles) {
        this.roles = roles;
    }
    ;
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Object)
], Roles.prototype, "roles", void 0);
Roles = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Roles);
function createRolesResolver(app, authTypes = []) {
    const unionType = (0, type_graphql_1.createUnionType)({ name: app.px.prefixer("authorized"), types: () => authTypes });
    let RolesResolver = class RolesResolver {
        async getMyRolesInApp(context) {
            const out = {};
            for (let key in app.roles) {
                out[app.roles[key]] = context.authorizable.hasRole([app.roles[key]]);
            }
            return new Roles(out);
        }
        ;
        async getMyUser(context) {
            return context.authorizable.getUser();
        }
        ;
    };
    __decorate([
        app.px.Query(() => Roles, { authorized: [], description: "Return" }),
        __param(0, (0, type_graphql_1.Ctx)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [context_1.Context]),
        __metadata("design:returntype", Promise)
    ], RolesResolver.prototype, "getMyRolesInApp", null);
    __decorate([
        app.px.Query(() => unionType, { authorized: [] }),
        __param(0, (0, type_graphql_1.Ctx)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [context_1.Context]),
        __metadata("design:returntype", Promise)
    ], RolesResolver.prototype, "getMyUser", null);
    RolesResolver = __decorate([
        (0, type_graphql_1.Resolver)()
    ], RolesResolver);
    return RolesResolver;
}
exports.createRolesResolver = createRolesResolver;
