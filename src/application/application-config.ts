import Env from "../env/env";


export default function applicationConfig(env: Env, code?: string) {
	code = env.string("CODE", code);
	return {
		app: {
			id: env.string("ID"),
			code: code,
			secret: env.string("SECRET"),
			name: env.string("NAME", code)
		}
	};
}