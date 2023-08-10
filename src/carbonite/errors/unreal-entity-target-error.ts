import {EntityMetadata} from "typeorm";
import BaseError from "../../base-error/BaseError";


export default class UnrealEntityTargetError extends BaseError {
    constructor(entity: EntityMetadata) {
        super(
            "Relation's inverse entity must be a real entity.",
            {
                entity
            }
        );
    };
}
