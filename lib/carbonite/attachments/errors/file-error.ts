import BaseError from "@lib/base-error/BaseError";
import Catalog from "../catalog";


export default class FileError extends BaseError {
    constructor(catalog: Catalog, filename: string) {
        super(
            "File error " + catalog.owner.ident,
            {
                filename
            }
        );
    };
}
