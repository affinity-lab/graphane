import createErrorData from "../error/create-error-data";
import preprocessErrorTree from "../error/preprocess-error-tree";


const GraphaneError = {
	application: {
		notFound: () => createErrorData(),
		alreadyRegistered: (app: string) => createErrorData({app})
	},
	module: {
		notFound: () => createErrorData(),
		alreadyRegistered: (module: string) => createErrorData({module})
	},
	crud: {
		unrealEntityTarget: (target: string | any) => createErrorData({target}),
		badRelationType: () => createErrorData()
	}
};

preprocessErrorTree(GraphaneError, "GRAPHANE");
export default GraphaneError;
