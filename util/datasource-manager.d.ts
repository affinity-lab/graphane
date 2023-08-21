export default class Storage<T> {
    private storage;
    constructor();
    set(key: string, value: T): void;
    get(key: string): T | undefined;
    getOrFail(key: string): T;
}
