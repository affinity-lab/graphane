export default class Storage<T> {
    private defaultKey?;
    private storage;
    constructor(defaultKey?: string | undefined);
    set(key: string, value: T): void;
    get(key?: string): T | undefined;
    getOrFail(key?: string): T;
}
