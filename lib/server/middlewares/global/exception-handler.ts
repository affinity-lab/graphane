import {NextFunction, Request, Response} from "express";


export default function exceptionHandler() {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            next();
        } catch (e) {
            console.log("-------------------------------------");
            console.log(e);
            console.log("-------------------------------------");
            res.status(400).send(e);
        }
    };
}
