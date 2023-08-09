import BaseError from "../../../base-error/BaseError";
import Catalog from "../catalog";
export default class TooLargeAttachment extends BaseError {
    constructor(catalog: Catalog, maxFileSize: number, file: string, fileSize: number);
}
