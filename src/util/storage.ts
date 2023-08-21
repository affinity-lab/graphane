import GraphaneError       from "../graphane-error";

export default class Storage<T> {

	private storage: Record<string, T>

	constructor(private defaultKey?:string) {
		this.storage = {}
	}

	set(key: string, value: T) { this.storage[key] = value;}
	get(key?: string) {
		key = typeof key === "undefined" ? this.defaultKey :  key;
		if(typeof key === "undefined") throw GraphaneError.fatal("Storage get called without key, and it does not have default key!")
		return (this.storage.hasOwnProperty(key)) ? this.storage[key] : undefined;
	}
	getOrFail(key?: string) {
		const result = this.get(key)
		if (typeof result === "undefined") throw GraphaneError.fatal(`Storage key (${key}) not found`, {key})
		return result
	}
}