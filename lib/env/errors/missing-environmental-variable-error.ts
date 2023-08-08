import BaseError from "@lib/base-error/BaseError";


export default class MissingEnvironmentalVariableError extends BaseError {
    constructor(key: string) {
        super(
            `${key} environmental variable must be set.`,
            {
                key
            }
        );
    };
};