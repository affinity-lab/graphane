import {NextFunction, Request, Response} from "express";


export function resolveFileLocationMiddleware() {
	return (req: Request, res: Response, next: NextFunction): void => {
		let b36: string = parseInt(req.params["id"]).toString(36).padStart(6, "0");
		req.url = `/${req.params["module"]}/${req.params["entity"]}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${req.params["catalog"]}/${req.params["file"]}`;
		next();
	};
}

resolveFileLocationMiddleware.locationParams = "/:module/:entity/:id/:catalog/:file";
resolveFileLocationMiddleware.route = (baseUrl: string): string => baseUrl + resolveFileLocationMiddleware.locationParams;
