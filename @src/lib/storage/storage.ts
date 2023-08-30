import fatalError from "../../error/fatal-error";


/** A generic storage class that allows you to store and retrieve values of a specified type. */
export default class Storage<T> {
	private readonly storage: Record<string, T> = {};

	/** Creates a new instance of the Storage class.*/
	constructor(private defaultKey?: string) {};

	/** Sets a value in the storage with the specified key.*/
	set(key: string, value: T): void {
		this.storage[key] = value;
	};

	/** Retrieves the value associated with the given key from the storage. If no key is provided, it uses the default key if available. */
	get(key?: string): T | undefined {
		key = typeof key === "undefined" ? this.defaultKey : key;
		if (typeof key === "undefined") {
			throw fatalError("Storage get called without key, and it does not have default key!");
		}
		return (this.storage.hasOwnProperty(key)) ? this.storage[key] : undefined;
	};

	/** Retrieves the value associated with the given key from the storage. If no key is provided, it uses the default key if available. Throws an error if the value is not found. */
	getOrFail(key?: string): T | never {
		const result: T | undefined = this.get(key);
		if (typeof result === "undefined") {
			throw fatalError(`Storage key (${key}) not found`, {key});
		}
		return result;
	};
}
