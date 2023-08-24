import GraphaneError from "../error/graphane-error";
import AbstractGuard from "./abstract-guard";


export default function Guard(...roles: Array<string>): MethodDecorator {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]): Promise<boolean> {
            const instance: AbstractGuard = this as AbstractGuard;
            if ((instance.constructor as typeof AbstractGuard).app === undefined)  throw  GraphaneError.fatal("Application not defenied in guard.");
            if (instance.app!.code !== (instance.constructor as typeof AbstractGuard).app!.code) {
                GraphaneError.guard.forbidden();
            }
            await instance.isAuthenticated();
            if (roles.length > 0 && await instance.user!.hasRole(roles)) {
                return true;
            }
            if (originalMethod.apply(instance, args)) {
                return true;
            }
            throw GraphaneError.guard.unauthorized();
        };
    };
}
