import BaseError from "../../../base-error/BaseError";
import FileDescriptor from "../../../util/file-descriptor";


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
