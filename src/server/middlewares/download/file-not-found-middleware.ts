import {Request, Response} from "express";


export default function fileNotFoundMiddleware() {
    return (req: Request, res: Response): void => {
        res.sendStatus(404);
    };
}
