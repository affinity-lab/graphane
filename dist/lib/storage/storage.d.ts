/** A generic storage class that allows you to store and retrieve values of a specified type. */
export declare class Storage<T> {
    private defaultKey?;
    private readonly storage;
    /** Creates a new instance of the Storage class.*/
    constructor(defaultKey?: string | undefined);
    /** Sets a value in the storage with the specified key.*/
    set(key: string, value: T): void;
    /** Retrieves the value associated with the given key from the storage. If no key is provided, it uses the default key if available. */
    get(key?: string): T | undefined;
    /** Retrieves the value associated with the given key from the storage. If no key is provided, it uses the default key if available. Throws an error if the value is not found. */
    getOrFail(key?: string): T | never;
}
