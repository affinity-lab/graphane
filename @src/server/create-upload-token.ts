import Authorizable from "../application/authorizable";
import Atom from "../carbonite/atom";
import jwt from "jsonwebtoken"


export function createUploadToken(entity: typeof Atom, id: number, catalog: string, user: Authorizable | undefined, uploadTokenKey: string): string {
    return jwt.sign({
        module: entity.module,
        entity: entity.name,
        id,
        catalog,
        user: user?.id
    }, uploadTokenKey, {algorithm: "HS512", expiresIn: "10m"});
}
