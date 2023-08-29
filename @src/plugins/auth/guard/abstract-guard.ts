import {NonEmptyArray} from "../../../util/types";
import Authorizable from "../authorizable";
import Application from "../../../graphane/application/application";
import fatal from "../../../error/fatal";
import AuthError from "../auth-error";


export default abstract class AbstractGuard {
	static app?: Application;

	public app: Application;

	constructor(public user: Authorizable | undefined, app?: Application) {
		if (app === undefined) throw fatal("Resolver called without application.");
		this.app = app;
	};

	async getRoles(): Promise<{ [p: string]: boolean }> {
		const result: { [p: string]: boolean } = {};
		if (!Reflect.hasMetadata("client-role", this)) {
			return result;
		}
		const clientRoles: Array<{ method: string, as: string }> = Reflect.getMetadata("client-role", this);
		for (const clientRole of clientRoles) {
			try {
				result[clientRole.as] = await (this as unknown as { [key: string]: () => Promise<boolean> })[clientRole.method]();
			} catch (e) {
				result[clientRole.as] = false;
			}
		}
		return result;
	};

	async isAuthenticated(): Promise<boolean> {
		if (this.user === undefined) {
			throw AuthError.unauthorized();
		}
		return true;
	};

	async isNotAuthenticated(): Promise<boolean> {
		if (this.user !== undefined) {
			throw AuthError.alreadyLoggedIn();
		}
		return true;
	};

	async hasRole(...roles: NonEmptyArray<string>): Promise<boolean> {
		await this.isAuthenticated();
		if (await this.user!.hasRole(roles as string[])) {
			return true;
		}
		throw AuthError.forbidden();
	};
}
