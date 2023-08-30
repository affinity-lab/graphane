import createErrorData from "../../error/create-error-data";
import preprocessErrorTree from "../../error/preprocess-error-tree";


const InputGuardianError = {
	validation: (message: string, fields: Record<string, string>) => createErrorData({fields}, message)
};

preprocessErrorTree(InputGuardianError, "INPUT_GUARDIAN");
export default InputGuardianError;
