import { NextFunction, Request, Response } from "express";
export default function getUserMiddleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
