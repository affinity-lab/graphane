import BaseError from "@lib/base-error/BaseError";
import Catalog from "../catalog";


export default class TooManyAttachments extends BaseError {
    constructor(catalog: Catalog, maxFileCount: number) {
        super(
            "Too many attachments " + catalog.owner.ident,
            {
                maxFileCount
            }
        );
    };
}
