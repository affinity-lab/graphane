import BaseError from "../../../base-error/BaseError";
import { AtomWithAttachments } from "../../atom";
export default class FileDoesNotExistError extends BaseError {
    constructor(entity: AtomWithAttachments, catalog: string, fileName: string);
}
