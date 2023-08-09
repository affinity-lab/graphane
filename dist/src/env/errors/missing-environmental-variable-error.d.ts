import BaseError from "../../base-error/BaseError";
export default class MissingEnvironmentalVariableError extends BaseError {
    constructor(key: string);
}
