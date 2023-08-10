import BaseError from "../../../base-error/BaseError";


export class fileCrudBadInputError extends BaseError {
    constructor(which: string, variables: boolean = false) {
        super(
            variables ? `A parameter is set to an invalid value: ${which}` : `A variable is set to an invalid value: variables.${which}`,
            {
                badParam: which,
                fromVariables: variables
            }
        );
    };
}
