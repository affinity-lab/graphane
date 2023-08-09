import Authorizable from "../application/auth/authorizable";
import Atom from "../carbonite/atom";
import {encode} from "jwt-simple";


export function createUploadToken(entity: typeof Atom, id: number, catalog: string, user: Authorizable | undefined, uploadTokenKey: string): string {
    return encode({
        module: entity.module,
        entity: entity.name,
        id,
        catalog,
        user: user?.id
    }, uploadTokenKey, "HS512");
}