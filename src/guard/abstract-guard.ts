import GraphaneError from "../error/graphane-error";
import {NonEmptyArray} from "../util/types";
import RoleResolver from "./role-resolver-interface";


export default abstract class AbstractGuard {

    constructor(public user: undefined | RoleResolver) {
    };

    get roles(): {[p: string]: boolean} {
        const result: {[p: string]: boolean} = {};
        if (!Reflect.hasMetadata("client-role", this)) {
            return result;
        }
        const clientRoles: Array<{method: string, as: string}> = Reflect.getMetadata("client-role", this);
        for (const clientRole of clientRoles) {
            try {
                result[clientRole.as] = (this as unknown as {[key: string]: () => boolean})[clientRole.method]();
            } catch (e) {
                result[clientRole.as] = false;
            }
        }
        return result;
    };

    isAuthenticated(): boolean {
        if (this.user === undefined) {
            throw GraphaneError.guard.unauthorized();
        }
        return true;
    };

    isNotAuthenticated(): boolean {
        if (this.user !== undefined) {
            throw GraphaneError.guard.forbidden();
        }
        return true;
    };

    hasRole(...roles: NonEmptyArray<string>): boolean {
        this.isAuthenticated();
        if (this.user!.hasRole(roles as string[])) {
            return true;
        }
        throw GraphaneError.guard.forbidden();
    };
}