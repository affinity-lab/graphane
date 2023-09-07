"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatCase = void 0;
const snake_case_1 = require("snake-case");
const StringUtils_1 = require("typeorm/util/StringUtils");
const create_formatter_1 = require("../format/create-formatter");
function FormatCase(type) {
    return (target, key) => {
        (0, create_formatter_1.createFormatter)(target, key, (value) => {
            switch (type) {
                case "upper":
                    return value.toLocaleUpperCase();
                case "lower":
                    return value.toLocaleLowerCase();
                case "camel":
                    return (0, StringUtils_1.camelCase)(value, false);
                case "pascal":
                    return (0, StringUtils_1.camelCase)(value, true);
                case "snake":
                    return (0, snake_case_1.snakeCase)(value);
                default:
                    return value;
            }
        });
    };
}
exports.FormatCase = FormatCase;
