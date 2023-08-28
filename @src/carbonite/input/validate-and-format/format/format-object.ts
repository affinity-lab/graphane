import {FormatterFn} from "./create-formatter";


export default function formatObject(object: any): void {
    for (const i in object) {
        if (Reflect.hasMetadata("format", object, i)) {
            let formatters: FormatterFn[] = Reflect.getMetadata("format", object, i);
            formatters.forEach((formatter: FormatterFn) => object[i] = formatter(object[i]));
        }
    }
}
