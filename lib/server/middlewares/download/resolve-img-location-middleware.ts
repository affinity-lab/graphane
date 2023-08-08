import {NextFunction, Request, Response} from "express";
import * as fs from "fs";


export default function resolveImgLocationMiddleware(storagePath: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        let b36: string = parseInt(req.params["id"]).toString(36).padStart(6, "0");
        req.url = `/${req.params["module"]}-${req.params["entity"]}-${b36}-${req.params["catalog"]}-${req.params["width"]}.${req.params["height"]}.${req.params["focus"]}.${req.params["ver"]}.${req.params["originalExt"]}-${req.params["file"]}.${req.params["ext"]}`;
        fs.mkdirSync(storagePath, {recursive: true});
        next();
    };
}
