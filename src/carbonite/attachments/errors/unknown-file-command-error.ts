import BaseError from "../../../base-error/BaseError";
import {AtomWithAttachments} from "../../atom";
import {FileInputVariables} from "../inputs";


export class UnknownFileCommandError extends BaseError {
    constructor(command: string, entity: typeof AtomWithAttachments, id: number, catalog: string, variables: FileInputVariables | undefined) {
        super(
            `Unknown command: ${command}`,
            {
                command,
                entity,
                id,
                catalog,
                variables
            }
        );
    };
}
