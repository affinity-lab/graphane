import BaseError from "@lib/base-error/BaseError";


export default class ApplicationAlreadyRegisteredError extends BaseError {
    constructor(code: string) {
        super(
            `Application ${code} already registered!`,
            {
                application: code
            }
        );
    };
}
