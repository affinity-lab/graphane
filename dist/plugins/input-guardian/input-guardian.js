"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGuardian = void 0;
const format_object_1 = require("./format/format-object");
const validate_object_1 = require("./validate/validate-object");
const input_guardian_error_1 = require("./input-guardian-error");
function InputGuardian(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        for (const arg of args) {
            (0, format_object_1.formatObject)(arg);
            await (0, validate_object_1.validateObject)(arg, (response) => {
                throw input_guardian_error_1.InputGuardianError.validation(response.message, response.fields);
            });
        }
        return originalMethod.apply(this, arguments);
    };
    return descriptor;
}
exports.InputGuardian = InputGuardian;
