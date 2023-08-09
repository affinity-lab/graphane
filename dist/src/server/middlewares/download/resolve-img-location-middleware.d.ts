import { NextFunction, Request, Response } from "express";
export default function resolveImgLocationMiddleware(storagePath: string): (req: Request, res: Response, next: NextFunction) => void;
