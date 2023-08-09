import BaseError from "../base-error/BaseError";
export default class FailedToMaterializeError extends BaseError {
    constructor(reason: string);
}
