import { NonEmptyArray } from "@src/util/types";
import RoleResolver from "./role-resolver-interface";
export default abstract class AbstractGuard {
    user: undefined | RoleResolver;
    protected constructor(user: undefined | RoleResolver);
    get roles(): {
        [p: string]: boolean;
    };
    isAuthenticated(): boolean;
    isNotAuthenticated(): boolean;
    hasRole(...roles: NonEmptyArray<string>): boolean;
}
