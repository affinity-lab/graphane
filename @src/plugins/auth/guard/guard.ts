import AbstractGuard from "./abstract-guard";
import fatal from "../../../error/fatal";
import AuthError from "../auth-error";


export default function Guard(...roles: Array<string>): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
		const originalMethod = descriptor.value;
		descriptor.value = async function (...args: any[]): Promise<boolean> {
			const instance: AbstractGuard = this as AbstractGuard;
			if ((instance.constructor as typeof AbstractGuard).app === undefined) throw fatal("Application not defenied in guard.");
			if (instance.app!.code !== (instance.constructor as typeof AbstractGuard).app!.code) {
				AuthError.forbidden();
			}
			await instance.isAuthenticated();
			if (roles.length > 0 && await instance.user!.hasRole(roles)) {
				return true;
			}
			if (await originalMethod.apply(instance, args)) {
				return true;
			}
			throw AuthError.unauthorized();
		};
	};
}
