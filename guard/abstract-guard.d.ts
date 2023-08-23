import { NonEmptyArray } from "../util/types";
import Authorizable from "../application/authorizable";
export default abstract class AbstractGuard {
    user: Authorizable | undefined;
    constructor(user: Authorizable | undefined);
    getRoles(): Promise<{
        [p: string]: boolean;
    }>;
    isAuthenticated(): Promise<boolean>;
    isNotAuthenticated(): Promise<boolean>;
    hasRole(...roles: NonEmptyArray<string>): Promise<boolean>;
}
