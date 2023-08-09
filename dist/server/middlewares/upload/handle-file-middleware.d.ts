import { Request, Response } from "express";
export default function handleFileMiddleware(): (req: Request, res: Response) => Promise<void>;
