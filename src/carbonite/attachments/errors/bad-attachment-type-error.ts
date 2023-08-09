import BaseError from "../../../base-error/BaseError";


export default class BadAttachmentTypeError extends BaseError {
    constructor(expected: string, received: string) {
        super(
            `Expected attachment type of ${expected} but received ${received}`,
            {
                expected: expected,
                received: received
            }
        );
    }
}