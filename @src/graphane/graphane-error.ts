import error from "../error/error";
import preprocessErrorTree from "../error/preprocess-error-tree";


const GraphaneError = {
	application: {
		notFound: () => error(),
		alreadyRegistered: (app: string) => error({app})
	},
	module: {
		notFound: () => error(),
		alreadyRegistered: (module: string) => error({module})
	},
	crud: {
		unrealEntityTarget: (target: string | any) => error({target}),
		badRelationType: () => error()
	}
};

preprocessErrorTree(GraphaneError, "GRAPHANE");
export default GraphaneError;
