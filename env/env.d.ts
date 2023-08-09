export declare class Env {
    private readonly env;
    private readonly isTest;
    constructor(env: Record<string, string | undefined>);
    value(key: string): string | undefined;
    string(key: string, default_?: string): string;
    int(key: string, default_?: number): number;
    float(key: string, default_?: number): number;
    boolean(key: string, default_?: boolean): boolean;
}
