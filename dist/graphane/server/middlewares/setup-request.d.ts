import { NextFunction, Request, Response } from "express";
export default function setupRequest(): (req: Request, res: Response, next: NextFunction) => void;
