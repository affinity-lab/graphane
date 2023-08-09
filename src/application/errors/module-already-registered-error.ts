import BaseError from "../../base-error/BaseError";


export default class ModuleAlreadyRegisteredError extends BaseError {
    constructor(code: string) {
        super(
            `Module ${code} already registered!`,
            {
                module: code
            }
        );
    };
}