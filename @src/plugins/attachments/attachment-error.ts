import error from "../../error/error";
import preprocessErrorTree from "../../error/preprocess-error-tree";


const AttachmentError = {
	upload: {
		badToken: () => error(),
		failed: (message: string) => error(undefined, message),
		validation: {
			tooManyAttachments: (count: number) => error({count}),
			tooLarge: (size: number) => error({size}),
			mimeTypeMismatch: (pattern: string | Array<string>) => error({pattern})
		}
	},
	imageExpected: () => error(),
	fileCrud: {
		badInput: (err: string) => error({error: err}),
		unknownCommand: (err: string) => error({command: err}),
		fileNotExists: () => error(),
		fileAlreadyExists: (name: string) => error({name})
	}
};

preprocessErrorTree(AttachmentError, "ATTACHMENT");
export default AttachmentError;
