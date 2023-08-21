import AbstractGuard from "./abstract-guard";
import GraphaneError from "../graphane-error";

export default function Guard(...roles: Array<string>): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;
		descriptor.value = function (...args: any[]) {
			const instance = this as AbstractGuard;
			instance.isAuthenticated();
			if (roles.length > 0 && instance.user!.hasRole(roles)) return true;
			if (originalMethod.apply(instance, args)) return true;
			throw  GraphaneError.guard.unauthorized();;
		}
	}
}