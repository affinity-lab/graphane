import {AbstractGuard} from "./abstract-guard";
import {AuthError} from "../auth-error";
import {Application} from "../../../graphane/application/application";


export function Guard(...roles: Array<string>): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
		const originalMethod = descriptor.value;
		descriptor.value = async function (...args: any[]): Promise<boolean> {
			const instance: AbstractGuard = this as AbstractGuard;
			if (!(instance.constructor as typeof AbstractGuard).app.some((app: Application): boolean => app.code === instance.app.code)) {
				throw AuthError.forbidden();
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
