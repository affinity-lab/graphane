import BaseError from "../../base-error/BaseError";
export default class ApplicationAlreadyRegisteredError extends BaseError {
    constructor(code: string);
}
