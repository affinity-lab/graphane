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
exports.PermissionResolver = exports.Permissions = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = require("graphql-type-json");
const context_1 = require("../../graphane/server/context");
let Permissions = class Permissions {
    constructor(roles) {
        this.roles = roles;
    }
    ;
};
exports.Permissions = Permissions;
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Object)
], Permissions.prototype, "roles", void 0);
exports.Permissions = Permissions = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Permissions);
class PermissionResolver {
    constructor(currentApplication, currentAuthorized) {
        this.currentApplication = currentApplication;
        this.currentAuthorized = currentAuthorized;
    }
    ;
    create(app, guardFactory) {
        const currentApplication = this.currentApplication;
        const currentAuthorized = this.currentAuthorized;
        let PermissionResolver = class PermissionResolver {
            async getMyPermissionsInApp(ctx) {
                return new Permissions(await guardFactory(currentApplication.get(ctx.request), currentAuthorized.get(ctx.request)).getRoles());
            }
        };
        __decorate([
            app.px.Query(() => Permissions, { description: "Return the values of all exportRole guards of the app" }),
            __param(0, (0, type_graphql_1.Ctx)()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [context_1.Context]),
            __metadata("design:returntype", Promise)
        ], PermissionResolver.prototype, "getMyPermissionsInApp", null);
        PermissionResolver = __decorate([
            (0, type_graphql_1.Resolver)(Permissions)
        ], PermissionResolver);
        return PermissionResolver;
    }
    ;
}
exports.PermissionResolver = PermissionResolver;
