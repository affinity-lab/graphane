import { NextFunction, Request, Response } from "express";
import CurrentApplication from "../../application/current-application";
export default function appGuardMiddleware(currentApplication: CurrentApplication): (req: Request, res: Response, next: NextFunction) => Promise<void>;
