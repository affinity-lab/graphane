import BaseError from "../../../base-error/BaseError";
export declare class CannotRenameFileError extends BaseError {
    constructor(filename: string, newName: string);
}
