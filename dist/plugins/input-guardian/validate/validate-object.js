"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObject = void 0;
const class_validator_1 = require("class-validator");
async function validateObject(data, onError) {
    if (typeof data !== "object")
        return true;
    let errors = await (0, class_validator_1.validate)(data);
    if (errors.length == 0) {
        return true;
    }
    else {
        let errorMessage = "";
        let fields = {};
        for (let validationError of errors) {
            errorMessage += `${validationError.property}: `;
            for (let failedConstraint in validationError.constraints) {
                errorMessage += `${validationError.constraints[failedConstraint]}; `;
                fields[validationError.property] = validationError.constraints[failedConstraint];
            }
        }
        let response = { message: errorMessage, fields };
        if (typeof onError !== "undefined") {
            onError(response);
        }
        return response;
    }
}
exports.validateObject = validateObject;
