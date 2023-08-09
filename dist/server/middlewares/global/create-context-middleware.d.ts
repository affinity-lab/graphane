import { NextFunction, Request, Response } from "express";
export default function createContextMiddleware(): (req: Request, res: Response, next: NextFunction) => void;
