import { NonEmptyArray } from "../util/types";
import Authorizable from "../application/authorizable";
export default abstract class AbstractGuard {
    user: Authorizable | undefined;
    constructor(user: Authorizable | undefined);
    get roles(): {
        [p: string]: boolean;
    };
    isAuthenticated(): boolean;
    isNotAuthenticated(): boolean;
    hasRole(...roles: NonEmptyArray<string>): boolean;
}
