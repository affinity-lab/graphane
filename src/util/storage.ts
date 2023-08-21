import GraphaneError from "@src/error/graphane-error";


export default class Storage<T> {

    private readonly storage: Record<string, T> = {};

    constructor(private defaultKey?: string) {
    };

    set(key: string, value: T): void {
        this.storage[key] = value;
    };

    get(key?: string): T | undefined {
        key = typeof key === "undefined" ? this.defaultKey : key;
        if (typeof key === "undefined") {
            throw GraphaneError.fatal("Storage get called without key, and it does not have default key!");
        }
        return (this.storage.hasOwnProperty(key)) ? this.storage[key] : undefined;
    };

    getOrFail(key?: string): T | never {
        const result: T | undefined = this.get(key);
        if (typeof result === "undefined") {
            throw GraphaneError.fatal(`Storage key (${key}) not found`, {key});
        }
        return result;
    };
}