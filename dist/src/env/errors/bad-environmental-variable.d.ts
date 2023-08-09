import BaseError from "../../base-error/BaseError";
export default class BadEnvironmentalVariable extends BaseError {
    constructor(key: string, type: string);
}
