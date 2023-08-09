import BaseError from "../../base-error/BaseError";
import Atom from "../atom";
export default class DeleteRestrictionError extends BaseError {
    constructor(host: typeof Atom, related: typeof Atom);
}
