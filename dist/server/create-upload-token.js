"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadToken = void 0;
const jwt_simple_1 = require("jwt-simple");
function createUploadToken(entity, id, catalog, user, uploadTokenKey) {
    return (0, jwt_simple_1.encode)({
        module: entity.module,
        entity: entity.name,
        id,
        catalog,
        user: user?.id
    }, uploadTokenKey, "HS512");
}
exports.createUploadToken = createUploadToken;
