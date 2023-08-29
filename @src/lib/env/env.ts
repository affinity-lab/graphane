import path from "path";
import fatal from "../../error/fatal";


export default class Env {
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

	sub(key: string): Env {
		const subEnv = key.split(".").reduce((a, b) => a[b], this.env);
		if (typeof subEnv === "object") return new Env({...subEnv}, this.environment, this.envPostfixMap);
		throw fatal(`Env Sub-key not found: ${key}`);
	}

	string(key: string, defaultValue?: string): string {
		let rawValue = this.value(key);
		let value = typeof rawValue === "undefined"
					? defaultValue
					: rawValue.trim();

		if (typeof value === "undefined") {
			throw fatal(`Missing Env variable (string): ${key}`);
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
			throw fatal(`Missing Env variable (path): ${key}`);
		}
		this.info.push({key: key, type: "path", defaultValue, value});
		value = path.resolve(process.cwd(), value);
		return value;
	}

	int(key: string, defaultValue?: number): number {
		let rawValue = this.value(key);
		let value: number | undefined =
			typeof rawValue === "undefined"
			? defaultValue
			: parseInt(rawValue.toString());
		if (typeof value === "undefined") {
			throw fatal(`Missing Env variable (int): ${key}`);
		}
		if (isNaN(value)) {
			throw fatal(`Env variable type failed: ${key} (int)`);
		}
		this.info.push({key: key, type: "int", defaultValue, value});
		return value;
	}

	float(key: string, defaultValue?: number): number {
		let rawValue = this.value(key);
		let value: number | undefined =
			typeof rawValue === "undefined"
			? defaultValue
			: parseFloat(rawValue.toString());
		if (typeof value === "undefined") {
			throw fatal(`Missing Env variable (float): ${key}`);
		}
		if (isNaN(value)) {
			throw fatal(`Env variable type failed: ${key} (float)`);
		}
		this.info.push({key: key, type: "float", defaultValue, value});
		return value;
	}

	boolean(key: string, defaultValue?: boolean): boolean {
		let rawValue = this.value(key);
		let value: boolean | undefined =
			typeof rawValue === "undefined"
			? defaultValue
			: typeof rawValue === "boolean"
			  ? rawValue
			  : ["1", "yes", "true"].indexOf(rawValue.toLowerCase().trim()) != -1;
		if (typeof value === "undefined") {
			throw fatal(`Missing Env variable (boolean): ${key}`);
		}
		this.info.push({key: key, type: "boolean", defaultValue, value});
		return value;
	}

	private value(key: string): any | undefined {
		const postfix = this.envPostfixMap[this.environment];
		const optionalKey = postfix !== undefined ? `${key}__${this.envPostfixMap[this.environment]}` : undefined;
		if (optionalKey !== undefined && this.env.hasOwnProperty(optionalKey)) return this.env[optionalKey];
		if (this.env.hasOwnProperty(key)) return this.env[key];
		return undefined;
	}
}
