import BaseError from "../../base-error/BaseError";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
export default class BadRelationTypeError extends BaseError {
    constructor(rel: RelationMetadata);
}
