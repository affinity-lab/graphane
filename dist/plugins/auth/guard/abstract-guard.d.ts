import { NonEmptyArray } from "../../../util/types";
import Authorizable from "../authorizable";
import Application from "../../../graphane/application/application";
export default abstract class AbstractGuard {
    user: Authorizable | undefined;
    static app?: Application;
    app: Application;
    constructor(user: Authorizable | undefined, app?: Application);
    getRoles(): Promise<{
        [p: string]: boolean;
    }>;
    isAuthenticated(): Promise<boolean>;
    isNotAuthenticated(): Promise<boolean>;
    hasRole(...roles: NonEmptyArray<string>): Promise<boolean>;
}
