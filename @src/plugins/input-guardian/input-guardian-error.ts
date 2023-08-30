import {createErrorData} from "../../error/create-error-data";
import {preprocessErrorTree} from "../../error/preprocess-error-tree";


export const InputGuardianError = {
	validation: (message: string, fields: Record<string, string>) => createErrorData({fields}, message),
	sanitization: (message: string, info: Record<string, any>) => createErrorData(info, message)
};

preprocessErrorTree(InputGuardianError, "INPUT_GUARDIAN");
