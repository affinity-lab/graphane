import BaseError from "../../base-error/BaseError";
import Atom from "../atom";


export default class DeleteRestrictionError extends BaseError {
    constructor(host: typeof Atom, related: typeof Atom) {
        super(
            `Cannot delete ${host.name} while it is associated with a(n) ${related.name}.`,
            {
                host,
                related
            }
        );
    };
}
