import BadEnvironmentalVariable from "./errors/bad-environmental-variable";
import MissingEnvironmentalVariableError from "./errors/missing-environmental-variable-error";


export class Env {
    private readonly isTest: boolean;

    constructor(private readonly env: Record<string, string | undefined>) {
        this.isTest = this.boolean("IS_TEST", false);
    };

    value(key: string): string | undefined {
        if (this.isTest && this.env.hasOwnProperty("TEST_" + key)) {
            return this.env["TEST_" + key];
        }
        if (this.env.hasOwnProperty(key)) {
            return this.env[key];
        }
        return undefined;
    };

    string(key: string, default_?: string): string {
        let value: string | undefined = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new MissingEnvironmentalVariableError(key);
            }
            return default_;
        }
        return value;
    };

    int(key: string, default_?: number): number {
        let value: string | undefined = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new MissingEnvironmentalVariableError(key);
            }
            return default_;
        }
        let returnValue = parseInt(value);
        if (isNaN(returnValue)) {
            throw new BadEnvironmentalVariable(key, "integer");
        }
        return returnValue;
    };

    float(key: string, default_?: number): number {
        let value: string | undefined = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new MissingEnvironmentalVariableError(key);
            }
            return default_;
        }
        let returnValue = parseFloat(value);
        if (isNaN(returnValue)) {
            throw new BadEnvironmentalVariable(key, "float");
        }
        return returnValue;
    };

    boolean(key: string, default_?: boolean): boolean {
        let value: string | undefined = this.value(key);
        if (typeof value == "undefined") {
            if (typeof default_ == "undefined") {
                throw new MissingEnvironmentalVariableError(key);
            }
            return default_;
        }
        return ["1", "yes", "true"].indexOf(value.toLowerCase().trim()) != -1;
    };
}
