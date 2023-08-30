import { NextFunction, Request, Response } from "express";
export declare function uploadFileMiddleware(fileUploadConfig: Record<string, any>): (req: Request, res: Response, next: NextFunction) => void;
