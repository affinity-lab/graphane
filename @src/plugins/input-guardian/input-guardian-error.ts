import error from "../../error/error";
import preprocessErrorTree from "../../error/preprocess-error-tree";


const InputGuardianError = {
	validation: (message: string, fields: Record<string, string>) => error({fields}, message)
};

preprocessErrorTree(InputGuardianError, "INPUT_GUARDIAN");
export default InputGuardianError;
