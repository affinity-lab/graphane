import BaseError from "../../../base-error/BaseError";
export default class BadAttachmentTypeError extends BaseError {
    constructor(expected: string, received: string);
}
