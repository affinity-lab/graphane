import {Request, Response} from "express";


export function fileNotFoundMiddleware() {
	return (req: Request, res: Response): void => {
		res.sendStatus(404);
	};
}
