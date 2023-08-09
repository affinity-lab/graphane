import formatObject from "./format/format-object";
import InputValidationError from "./validate/input-validation-error";
import validateObject, {ValidationErrorResponse} from "./validate/validate-object";


export function ValidateAndFormatInput(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]): Promise<any> {
        for (const arg of args) {
            formatObject(arg);
            await validateObject(arg, (response: ValidationErrorResponse): never => {
                throw new InputValidationError(response.message, response.fields);
            });
        }
        return originalMethod.apply(this, arguments);
    };
    return descriptor;
}