"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snake_case_1 = require("snake-case");
const StringUtils_1 = require("typeorm/util/StringUtils");
const create_formatter_1 = __importDefault(require("../format/create-formatter"));
function FormatCase(type) {
    return (target, key) => {
        (0, create_formatter_1.default)(target, key, (value) => {
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
exports.default = FormatCase;
