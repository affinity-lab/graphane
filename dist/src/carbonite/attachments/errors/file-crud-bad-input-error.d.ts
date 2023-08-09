import BaseError from "../../../base-error/BaseError";
export declare class fileCrudBadInputError extends BaseError {
    constructor(which: string, variables?: boolean);
}
