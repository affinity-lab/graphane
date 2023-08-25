"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUploadToken(entity, id, catalog, user, uploadTokenKey) {
    return jsonwebtoken_1.default.sign({
        module: entity.module,
        entity: entity.name,
        id,
        catalog,
        user: user?.id
    }, uploadTokenKey, { algorithm: "HS512", expiresIn: "10m" });
}
exports.createUploadToken = createUploadToken;
