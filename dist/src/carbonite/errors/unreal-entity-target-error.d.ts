import BaseError from "../../base-error/BaseError";
import { EntityMetadata } from "typeorm";
export default class UnrealEntityTargetError extends BaseError {
    constructor(entity: EntityMetadata);
}
