import BaseError from "@lib/base-error/BaseError";
import FileDescriptor from "@lib/util/file-descriptor";


export default class NotImageError extends BaseError {
    constructor(fileDescriptor: FileDescriptor) {
        super(
            "Can not treat file as an image!",
            {
                fileDescriptor
            }
        );
    };
}
