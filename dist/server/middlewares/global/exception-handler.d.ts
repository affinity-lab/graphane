import { NextFunction, Request, Response } from "express";
export default function exceptionHandler(): (req: Request, res: Response, next: NextFunction) => void;