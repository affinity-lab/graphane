export interface stringRecord extends Record<string, string | string[] | number | undefined | stringRecord> {
}

export type formatterInOutput = string | string[] | number | undefined | stringRecord;

export type FormatterFn = (value: formatterInOutput) => formatterInOutput;

type AtomicFormatterFn = (value: string) => string;

export default function createFormatter(target: any, key: any, fn: AtomicFormatterFn): void {
    if (!Reflect.hasMetadata("format", target, key)) {
        Reflect.defineMetadata("format", [], target, key);
    }
    let metadata = Reflect.getMetadata("format", target, key);
    let formatter: FormatterFn = (value: formatterInOutput): formatterInOutput => {
        if (typeof value === "undefined") {
            return value;
        } else if (Array.isArray(value)) {
            return value.map((text: string) => fn(text));
        } else if (typeof value === "string") {
            return fn(value);
        } else if (typeof value === "number") {
            return value;
        } else {
            const rObject: stringRecord = {};
            for (let key in value) {
                rObject[fn(key)] = formatter(value);
            }
            return rObject;
        }
    };
    metadata.push(formatter);
}
