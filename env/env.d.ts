export declare class Env {
    private readonly env;
    private testPrefix;
    readonly isTest: boolean;
    info: Array<{
        key: string;
        type: "string" | "int" | "float" | "boolean" | "path";
        defaultValue: any;
        value: any;
    }>;
    constructor(env: Record<string, string | undefined>, isTestKey?: string, testPrefix?: string);
    private value;
    string(key: string, defaultValue?: string): string;
    path(key: string, defaultValue?: string): string;
    int(key: string, defaultValue?: number): number;
    float(key: string, defaultValue?: number): number;
    boolean(key: string, defaultValue?: boolean): boolean;
}
