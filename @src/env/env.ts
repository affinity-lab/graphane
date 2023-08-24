import GraphaneError from "../error/graphane-error";
import path from "path";


export default class Env {
	public readonly isTest: boolean;
	public readonly environment: string;
	public info: Array<{
		key: string,
		type: "string" | "int" | "float" | "boolean" | "path",
		defaultValue: any,
		value: any
	}> = [];

	constructor(
		readonly env: Record<string, any>,
		environment: string | { key: string, default: string } = "PROD",
		public readonly envPostfixMap: Record<string, string | undefined>
	) {
		this.environment = typeof environment === "object"
						   ? this.string(environment.key, environment.default)
						   : environment;
	}

	sub(key: string): Env | undefined {
		const subEnv = key.split(".").reduce((a, b) => a[b], this.env);
		return (typeof subEnv === "object")
			   ? new Env({...subEnv}, this.environment, this.envPostfixMap)
			   : undefined;
	}

	string(key: string, defaultValue?: string): string {
		let rawValue = this.value(key);
		let value = typeof rawValue === "undefined"
					? defaultValue
					: rawValue.trim();

		if (typeof value === "undefined") {
			throw GraphaneError.fatal(`Missing Env variable: ${key}`);
		}
		this.info.push({key: key, type: "string", defaultValue, value});
		return value;
	}

	path(key: string, defaultValue?: string): string {
		let rawValue = this.value(key);
		let value = typeof rawValue === "undefined"
					? defaultValue
					: rawValue.trim();
		if (typeof value === "undefined") {
			throw GraphaneError.fatal(`Missing Env variable: ${key}`);
		}
		this.info.push({key: key, type: "path", defaultValue, value});
		value = path.resolve(process.cwd(), value);
		return value;
	}

	int(key: string, defaultValue?: number): number {
		let rawValue = this.value(key);
		let value =
			typeof rawValue === "undefined"
			? defaultValue
			: parseInt(rawValue);

		if (typeof value === "undefined") {
			throw GraphaneError.fatal(`Missing Env variable: ${key}`);
		}
		if (isNaN(value)) {
			throw GraphaneError.fatal(`Env variable type failed: ${key} (int)`);
		}
		this.info.push({key: key, type: "int", defaultValue, value});
		return value;
	}

	float(key: string, defaultValue?: number): number {
		let rawValue = this.value(key);
		let value =
			typeof rawValue === "undefined"
			? defaultValue
			: parseFloat(rawValue);
		if (typeof value === "undefined") {
			throw GraphaneError.fatal(`Missing Env variable: ${key}`);
		}
		if (isNaN(value)) {
			throw GraphaneError.fatal(`Env variable type failed: ${key} (float)`);
		}
		this.info.push({key: key, type: "float", defaultValue, value});
		return value;
	}

	boolean(key: string, defaultValue?: boolean): boolean {
		let rawValue = this.value(key);
		let value =
			typeof rawValue === "undefined"
			? defaultValue
			: ["1", "yes", "true"].indexOf(rawValue.toLowerCase().trim()) != -1
		;
		if (typeof value === "undefined") {
			throw GraphaneError.fatal(`Missing Env variable: ${key}`);
		}
		this.info.push({key: key, type: "boolean", defaultValue, value});
		return value;
	}

	private value(key: string): string | undefined {
		const postfix = this.envPostfixMap[this.environment];
		const optionalKey = postfix !== undefined ? `${key}__${this.envPostfixMap[this.environment]}` : undefined;
		if (optionalKey !== undefined && this.env.hasOwnProperty(optionalKey)) return this.env[optionalKey];
		if (this.env.hasOwnProperty(key)) return this.env[key];
		return undefined;
	}
}
