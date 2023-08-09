import BaseError from "../../base-error/BaseError";
export default class InputValidationError extends BaseError {
    constructor(message: string, fields: Record<string, string>);
}
