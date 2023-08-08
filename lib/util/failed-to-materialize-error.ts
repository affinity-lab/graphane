import BaseError from "@lib/base-error/BaseError";


export default class FailedToMaterializeError extends BaseError {
    constructor(reason: string) {
        super(
            reason
        );
    };
}
