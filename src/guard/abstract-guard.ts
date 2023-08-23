import GraphaneError from "../error/graphane-error";
import {NonEmptyArray} from "../util/types";
import Authorizable from "../application/authorizable";
import Application from "../application/application";


export default abstract class AbstractGuard {
    constructor(public user: Authorizable | undefined, public  app: Application) {
    };

    static  app?: Application;

    async getRoles(): Promise<{[p: string]: boolean}> {
        const result: {[p: string]: boolean} = {};
        if (!Reflect.hasMetadata("client-role", this)) {
            return result;
        }
        const clientRoles: Array<{method: string, as: string}> = Reflect.getMetadata("client-role", this);
        for (const clientRole of clientRoles) {
            try {
                result[clientRole.as] = await (this as unknown as {[key: string]: () => Promise<boolean>})[clientRole.method]();
            } catch (e) {
                result[clientRole.as] = false;
            }
        }
        return result;
    };

    async isAuthenticated(): Promise<boolean> {
        if (this.user === undefined) {
            throw GraphaneError.guard.unauthorized();
        }
        return true;
    };

    async isNotAuthenticated(): Promise<boolean> {
        if (this.user !== undefined) {
            throw GraphaneError.guard.forbidden();
        }
        return true;
    };

    async hasRole(...roles: NonEmptyArray<string>): Promise<boolean> {
        await this.isAuthenticated();
        if (await this.user!.hasRole(roles as string[])) {
            return true;
        }
        throw GraphaneError.guard.forbidden();
    };
}
