import BaseError from "../../base-error/BaseError";


export default class BadEnvironmentalVariable extends BaseError {
    constructor(key: string, type: string) {
        super(
            `${key} environmental variable must be a(n) ${type}.`,
            {
                key,
                type
            }
        );
    };
};