export default class Env {
    private readonly env;
    readonly environment: string;
    readonly envPostfixMap: Record<string, string | undefined>;
    readonly isTest: boolean;
    info: Array<{
        key: string;
        type: "string" | "int" | "float" | "boolean" | "path";
        defaultValue: any;
        value: any;
    }>;
    constructor(env: Record<string, string | undefined>, environment: string, envPostfixMap: Record<string, string | undefined>);
    string(key: string, defaultValue?: string): string;
    path(key: string, defaultValue?: string): string;
    int(key: string, defaultValue?: number): number;
    float(key: string, defaultValue?: number): number;
    boolean(key: string, defaultValue?: boolean): boolean;
    private value;
}
