import { Request, Response } from "express";
export default function fileNotFoundMiddleware(): (req: Request, res: Response) => void;
