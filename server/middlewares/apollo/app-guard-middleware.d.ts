import { NextFunction, Request, Response } from "express";
export default function appGuardMiddleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
