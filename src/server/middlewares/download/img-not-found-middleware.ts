import {Request, Response} from "express";
import * as fs from "fs";
import path from "path";
import sharp from "sharp";


export default function imgNotFoundMiddleware(fileStoragePath: string, imgStoragePath: string) {
    return async (req: Request, res: Response): Promise<void> => {
        let b36: string = parseInt(req.params["id"]).toString(36).padStart(6, "0");
        const inp: string = `/${req.params["module"]}/${req.params["entity"]}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${req.params["catalog"]}/${req.params["file"]}.${req.params["originalExt"]}`;
        if (fs.existsSync(path.resolve(fileStoragePath, inp))) {
            res.sendStatus(404);
            return;
        }
        await sharp(fileStoragePath + inp, {animated: true})
            .resize(parseInt(req.params["width"]), parseInt(req.params["height"]), {
                kernel: sharp.kernel.lanczos3,
                fit: "cover",
                position: req.params["focus"],
                withoutEnlargement: true
            })
            .toFile(imgStoragePath + "/" + req.url);
        res.sendFile(path.resolve(imgStoragePath + "/" + req.url));
    };
}
