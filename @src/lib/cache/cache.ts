import * as crypto from "crypto";


function timestamp(): number { return Math.floor((new Date()).getTime() / 1000);}

class CacheItem<Type> {
	public created: number;

	constructor(readonly item: Type) {
		this.created = timestamp();
	};
}

export default class Cache<Args = any, Type = any> {
	private cache: { [p: string]: CacheItem<Type> } = {};

	private readonly keygen: (args: any) => string;

	constructor(
		private fetch: (args: any) => any,
		keygen?: (args: any) => string,
		private ttl: number = 60,
		private gc: number = 10
	) {
		this.keygen = keygen === undefined ? (args: any) => crypto.createHash("md5").update(JSON.stringify(args)).digest("hex") : keygen;
		setInterval(
			(): void => {
				for (let key in this.cache) {
					if (this.cache[key].created + ttl > timestamp()) {
						delete this.cache[key];
					}
				}
			},
			gc
		);
	};

	async get(args: Args): Promise<Type | undefined> {
		let key: string = this.keygen(args);
		let item: Type | undefined = this.hasKey(key) ? this.cache[key].item : await this.fetch(args);
		if (item !== undefined) {
			this.set(key, item);
		}
		return item;
	};

	has(args: Args): boolean {
		return this.hasKey(this.keygen(args));
	};

	invalidate(args: Args): void {
		delete this.cache[this.keygen(args)];
	};

	clear(): void {
		this.cache = {};
	};

	private set(key: string, item: Type): void {
		this.cache[key] = new CacheItem<Type>(item);
	};

	private hasKey(key: string): boolean {
		return !Object.hasOwn(this.cache, key) ? false : this.cache[key].created + this.ttl <= timestamp();
	};
}
