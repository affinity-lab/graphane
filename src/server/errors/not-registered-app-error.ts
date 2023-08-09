import BaseError from "../../base-error/BaseError";


export default class NotRegisteredAppError extends BaseError {
    constructor() {
        super(
            "App is not registered"
        );
    };
}
