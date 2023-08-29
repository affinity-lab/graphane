import error from "../../error/error";
import preprocessErrorTree from "../../error/preprocess-error-tree";


const AuthError = {
	unauthorized: () => error(undefined, undefined, 401),
	forbidden: () => error(undefined, undefined, 403),
	alreadyLoggedIn: () => error(undefined, undefined, 403)
};

preprocessErrorTree(AuthError, "AUTH");
export default AuthError;
