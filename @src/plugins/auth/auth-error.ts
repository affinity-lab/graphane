import createErrorData from "../../error/create-error-data";
import preprocessErrorTree from "../../error/preprocess-error-tree";


const AuthError = {
	unauthorized: () => createErrorData(undefined, undefined, 401),
	forbidden: () => createErrorData(undefined, undefined, 403),
	alreadyLoggedIn: () => createErrorData(undefined, undefined, 403)
};

preprocessErrorTree(AuthError, "AUTH");
export default AuthError;
