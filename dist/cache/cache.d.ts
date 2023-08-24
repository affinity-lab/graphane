export declare class Cache<Args = any, Type = any> {
    private fetch;
    private ttl;
    private gc;
    private cache;
    private readonly keygen;
    constructor(fetch: (args: any) => any, keygen?: (args: any) => string, ttl?: number, gc?: number);
    get(args: Args): Promise<Type | undefined>;
    has(args: Args): boolean;
    invalidate(args: Args): void;
    clear(): void;
    private set;
    private hasKey;
}
