import {Request, Response} from "express";
import * as fs from "fs";
import path from "path";
import sharp from "sharp";
import {Img} from "@src/util/file-descriptor";


export default function imgNotFoundMiddleware(fileStoragePath: string, imgStoragePath: string) {
    return async (req: Request, res: Response): Promise<void> => {
        let b36: string = parseInt(req.params["id"]).toString(36).padStart(6, "0");
        const inp: string = `/${req.params["module"]}/${req.params["entity"]}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${req.params["catalog"]}/${req.params["file"]}.${req.params["originalExt"]}`;
        if (fs.existsSync(path.resolve(fileStoragePath, inp))) {
            res.sendStatus(404);
            return;
        }
        sharp.cache({files: 0});
        let img: sharp.Sharp = sharp(fileStoragePath + inp);
        let meta: Img = await Promise.all([img.metadata(), img.stats()])
            .then((res: [sharp.Metadata, sharp.Stats]): Img => ({meta: res[0], stats: res[1]}));
        let width: number = parseInt(req.params["width"]);
        let height: number = parseInt(req.params["height"]);
        let oWidth: number = meta.meta.width!;
        let oHeight: number = meta.meta.height!;
        if (oWidth < width) {
            height = Math.floor(height * oWidth / width);
            width = oWidth;
        }
        if (oHeight < height) {
            width = Math.floor(width * oHeight / height);
            height = oHeight;
        }
        // TODO: SymLink if there's already a pic in the required dimensions
        await sharp(fileStoragePath + inp, {animated: true})
            .resize(width, height, {
                kernel: sharp.kernel.lanczos3,
                fit: "cover",
                position: req.params["focus"],
                withoutEnlargement: true
            })
            .toFile(imgStoragePath + "/" + req.url);
        res.sendFile(path.resolve(imgStoragePath + "/" + req.url));
    };
}
