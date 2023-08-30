import { NextFunction, Request, Response } from "express";
export default function uploadFileMiddleware(fileUploadConfig: Record<string, any>): (req: Request, res: Response, next: NextFunction) => void;
