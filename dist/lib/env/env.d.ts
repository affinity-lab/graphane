export declare class Env {
    readonly env: Record<string, any>;
    readonly envPostfixMap: Record<string, string | undefined>;
    readonly environment: string;
    info: Array<{
        key: string;
        type: "string" | "int" | "float" | "boolean" | "path";
        defaultValue: any;
        value: any;
    }>;
    constructor(env: Record<string, any>, environment: string | {
        key: string;
        default: string;
    } | undefined, envPostfixMap: Record<string, string | undefined>);
    sub(key: string): Env;
    string(key: string, defaultValue?: string): string;
    path(key: string, defaultValue?: string): string;
    int(key: string, defaultValue?: number): number;
    float(key: string, defaultValue?: number): number;
    boolean(key: string, defaultValue?: boolean): boolean;
    private value;
}
