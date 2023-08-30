"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_object_1 = __importDefault(require("./format/format-object"));
const validate_object_1 = __importDefault(require("./validate/validate-object"));
const input_guardian_error_1 = __importDefault(require("./input-guardian-error"));
function InputGuardian(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        for (const arg of args) {
            (0, format_object_1.default)(arg);
            await (0, validate_object_1.default)(arg, (response) => {
                throw input_guardian_error_1.default.validation(response.message, response.fields);
            });
        }
        return originalMethod.apply(this, arguments);
    };
    return descriptor;
}
exports.default = InputGuardian;
