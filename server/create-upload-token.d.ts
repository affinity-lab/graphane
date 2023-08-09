import Authorizable from "../application/auth/authorizable";
import Atom from "../carbonite/atom";
export declare function createUploadToken(entity: typeof Atom, id: number, catalog: string, user: Authorizable | undefined, uploadTokenKey: string): string;
