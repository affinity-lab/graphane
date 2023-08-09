import { Request, Response } from "express";
export default function imgNotFoundMiddleware(fileStoragePath: string, imgStoragePath: string): (req: Request, res: Response) => Promise<void>;
