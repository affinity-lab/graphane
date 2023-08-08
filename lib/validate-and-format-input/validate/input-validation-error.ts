import BaseError from "@lib/base-error/BaseError";


export default class InputValidationError extends BaseError {
    constructor(message: string, fields: Record<string, string>) {
        super(
            message,
            {fields}
        );
    };
}
