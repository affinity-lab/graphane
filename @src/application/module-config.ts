import Env from "../env/env";


export default function moduleConfig(env: Env, code?: string) {
	code = env.string("CODE", code);
	return {module: {code: code}};
}