import { Request, Response } from "express";
export declare function imgNotFoundMiddleware(fileStoragePath: string, imgStoragePath: string): (req: Request, res: Response) => Promise<void>;
