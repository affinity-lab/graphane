export default function ExportRole(name: string): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
		if (!Reflect.hasMetadata("client-role", target)) {
			Reflect.defineMetadata("client-role", [], target);
		}
		Reflect.getMetadata("client-role", target).push({method: propertyKey, as: name});
	};
}
