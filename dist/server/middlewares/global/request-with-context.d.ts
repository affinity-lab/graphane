import { NextFunction, Request, Response } from "express";
export default function requestWithContext(): (req: Request, res: Response, next: NextFunction) => void;
