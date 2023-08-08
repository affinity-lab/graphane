import BaseError from "@lib/base-error/BaseError";


export class CannotRenameFileError extends BaseError {
    constructor(filename: string, newName: string) {
        super(
            `Cannot rename ${filename}, ${newName} is already used!`,
            {
                file: filename,
                newName: newName
            }
        );
    }
}