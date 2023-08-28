import Env from "../env/env";
import {ModuleConfigType} from "./module";
import GraphaneError from "../error/graphane-error";


export default function moduleConfig(env: Env | null, code?: string): ModuleConfigType {
	if (env !== null) code = env.string("CODE", code);
	if (code === undefined) throw GraphaneError.fatal();
	return {module: {code: code}};
}
