import { NextFunction, Request, Response } from "express";
export default function checkFileTokenMiddleware(uploadTokenKey: string): (req: Request, res: Response, next: NextFunction) => void;
