import { NextFunction, Request, Response } from "express";
export default function resolveFileLocationMiddleware(): (req: Request, res: Response, next: NextFunction) => void;
