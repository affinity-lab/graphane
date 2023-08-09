import BaseError from "../../../base-error/BaseError";
import Catalog from "../catalog";
export default class MimeTypeMismatch extends BaseError {
    constructor(catalog: Catalog, accepted: string | string[], mimetype: string);
}
