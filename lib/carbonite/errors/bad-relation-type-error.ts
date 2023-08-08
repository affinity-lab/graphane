import BaseError from "@lib/base-error/BaseError";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";


export default class BadRelationTypeError extends BaseError {
    constructor(rel: RelationMetadata) {
        super(
            `Cannot resolve relation type for relation: ${rel}`,
            {
                relation: rel
            }
        );
    };
}
