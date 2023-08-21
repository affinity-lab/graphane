import {encode} from "jwt-simple";
import Authorizable from "@src/application/auth/authorizable";
import Atom from "@src/carbonite/atom";


export function createUploadToken(entity: typeof Atom, id: number, catalog: string, user: Authorizable | undefined, uploadTokenKey: string): string {
    return encode({
        module: entity.module,
        entity: entity.name,
        id,
        catalog,
        user: user?.id
    }, uploadTokenKey, "HS512");
}
