import BaseError from "@lib/base-error/BaseError";


export default class NotRegisteredAppError extends BaseError {
    constructor() {
        super(
            "App is not registered"
        );
    };
}
