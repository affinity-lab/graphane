import { NextFunction, Request, Response } from "express";
export default function getAppMiddleware(guard?: boolean): (req: Request, res: Response, next: NextFunction) => void;
