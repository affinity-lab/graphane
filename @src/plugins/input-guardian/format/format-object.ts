import {FormatterFn} from "./create-formatter";


export function formatObject(object: any): void {
	if (typeof object !== "object") return;
	for (const i in object) {
		if (Reflect.hasMetadata("format", object, i)) {
			let formatters: FormatterFn[] = Reflect.getMetadata("format", object, i);
			formatters.forEach((formatter: FormatterFn) => object[i] = formatter(object[i]));
		}
	}
}
