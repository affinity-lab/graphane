"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateAndFormatInput = void 0;
const format_object_1 = __importDefault(require("./format/format-object"));
const input_validation_error_1 = __importDefault(require("./validate/input-validation-error"));
const validate_object_1 = __importDefault(require("./validate/validate-object"));
function ValidateAndFormatInput(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        for (const arg of args) {
            (0, format_object_1.default)(arg);
            await (0, validate_object_1.default)(arg, (response) => {
                throw new input_validation_error_1.default(response.message, response.fields);
            });
        }
        return originalMethod.apply(this, arguments);
    };
    return descriptor;
}
exports.ValidateAndFormatInput = ValidateAndFormatInput;
