import {validate, ValidationError} from "class-validator";


export type ValidationErrorResponse = {
	message: string;
	fields: Record<string, string>;
};

export async function validateObject(data: object, onError?: (response: ValidationErrorResponse) => never): Promise<true | ValidationErrorResponse> {
	let errors: ValidationError[] = await validate(data);
	if (errors.length == 0) {
		return true;
	} else {
		let errorMessage: string = "";
		let fields: Record<string, string> = {};
		for (let validationError of errors) {
			errorMessage += `${validationError.property}: `;
			for (let failedConstraint in validationError.constraints) {
				errorMessage += `${validationError.constraints[failedConstraint]}; `;
				fields[validationError.property] = validationError.constraints[failedConstraint];
			}
		}
		let response: ValidationErrorResponse = {message: errorMessage, fields};
		if (typeof onError !== "undefined") {
			onError(response);
		}
		return response;
	}
}
