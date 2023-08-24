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
exports.createPermissionResolver = exports.Permissions = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = require("graphql-type-json");
const context_1 = require("../server/context");
let Permissions = class Permissions {
    constructor(roles) {
        this.roles = roles;
    }
    ;
};
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Object)
], Permissions.prototype, "roles", void 0);
Permissions = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], Permissions);
exports.Permissions = Permissions;
function createPermissionResolver(app, guard) {
    let PermissionResolver = class PermissionResolver {
        async getMyPermissionsInApp(context) {
            return new Permissions(await guard(context).getRoles());
        }
        ;
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
exports.createPermissionResolver = createPermissionResolver;
