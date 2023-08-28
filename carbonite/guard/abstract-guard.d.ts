import { NonEmptyArray } from "../../util/types";
import Authorizable from "../../application/authorizable";
import Application from "../../application/application";
export default abstract class AbstractGuard {
    user: Authorizable | undefined;
    app: Application;
    constructor(user: Authorizable | undefined, app?: Application);
    static app?: Application;
    getRoles(): Promise<{
        [p: string]: boolean;
    }>;
    isAuthenticated(): Promise<boolean>;
    isNotAuthenticated(): Promise<boolean>;
    hasRole(...roles: NonEmptyArray<string>): Promise<boolean>;
}
