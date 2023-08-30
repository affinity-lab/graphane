import {snakeCase} from "snake-case";
import {camelCase} from "typeorm/util/StringUtils";
import {createFormatter} from "../format/create-formatter";


type TypeOptions = "upper" | "lower" | "snake" | "camel" | "pascal";

export function FormatCase(type: TypeOptions): PropertyDecorator {
	return (target: any, key: any): void => {
		createFormatter(target, key, (value: string): string => {
			switch (type) {
				case "upper":
					return value.toLocaleUpperCase();
				case "lower":
					return value.toLocaleLowerCase();
				case "camel":
					return camelCase(value, false);
				case "pascal":
					return camelCase(value, true);
				case "snake":
					return snakeCase(value);
				default:
					return value;
			}
		});
	};
}
