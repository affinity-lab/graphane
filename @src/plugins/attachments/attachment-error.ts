import createErrorData from "../../error/create-error-data";
import preprocessErrorTree from "../../error/preprocess-error-tree";


const AttachmentError = {
	upload: {
		badToken: () => createErrorData(),
		failed: (message: string) => createErrorData(undefined, message),
		validation: {
			tooManyAttachments: (count: number) => createErrorData({count}),
			tooLarge: (size: number) => createErrorData({size}),
			mimeTypeMismatch: (pattern: string | Array<string>) => createErrorData({pattern})
		}
	},
	imageExpected: () => createErrorData(),
	fileCrud: {
		badInput: (err: string) => createErrorData({error: err}),
		unknownCommand: (err: string) => createErrorData({command: err}),
		fileNotExists: () => createErrorData(),
		fileAlreadyExists: (name: string) => createErrorData({name})
	}
};

preprocessErrorTree(AttachmentError, "ATTACHMENT");
export default AttachmentError;
