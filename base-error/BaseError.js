"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class BaseError extends graphql_1.GraphQLError {
    constructor(message = "", info = {}) {
        super(message);
        this.extensions.graphane = {
            // code: code,
            // error: GRAPHENE_ERRORS[code],
            name: this.constructor.name,
            message: message,
            info: info
        };
    }
}
exports.default = BaseError;
//
// enum GRAPHENE_ERRORS {
// 	APPLICATION_ALREADY_REGISTERED ,
// 	MODULE_ALREADY_REGISTERED ,
// 	WRONG_ATTACHMENT_TYPE ,
// 	CAN_NOT_RENAME_FILE ,
// 	FILE_CRUD_WRONG_INPUT ,
// 	FILE_DOES_NOT_EXISTS ,
// 	FILE_ERROR ,
// 	ATTACHMENT_VALIDATION_IMAGE_FILE_EXPECTED,
// 	ATTACHMENT_VALIDATION_MIMETYPE_MISMATCH ,
// 	ATTACHMENT_VALIDATION_TOO_LARGE,
// 	ATTACHMENT_VALIDATION_TOO_MANY,
// 	UNKNOWN_FILE_COMMAND
// }
//
// function throwError(code: number, message: string, info: Record<string, any>) {throw new BaseError(code, message, info)}
//
// export const GraphaneError = {
// 	Application:{
// 		AlreadyRegistered: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.APPLICATION_ALREADY_REGISTERED, message, info)
// 	},
// 	Module:{
// 		AlreadyRegistered: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.MODULE_ALREADY_REGISTERED, message, info)
// 	},
// 	WrongAttachmentType: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.WRONG_ATTACHMENT_TYPE, message, info),
// 	CanNotRenameFile: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.CAN_NOT_RENAME_FILE, message, info),
// 	FileCrudWrongInput: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.FILE_CRUD_WRONG_INPUT, message, info),
// 	UnknownFileCommand: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.UNKNOWN_FILE_COMMAND, message, info),
// 	FileDoesNotExis: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.FILE_DOES_NOT_EXISTS, message, info),
// 	FileError: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.FILE_ERROR, message, info),
// 	Attachment:{
// 		Validation:{
// 	MimeTypeMismatch: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.ATTACHMENT_VALIDATION_MIMETYPE_MISMATCH, message, info),
// 			ImageFileExpected: (message: string = "", info: Record<string, any> = {}) => throwError(GRAPHENE_ERRORS.ATTACHMENT_VALIDATION_IMAGE_FILE_EXPECTED, message, info),
// 					}
// 	}
// }
//
