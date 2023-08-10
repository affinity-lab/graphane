import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import BaseError from "../../base-error/BaseError";
export default class BadRelationTypeError extends BaseError {
    constructor(rel: RelationMetadata);
}
