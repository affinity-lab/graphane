import Authorizable from "../../../application/authorizable";
import { NextFunction, Request, Response } from "express";
export default function getUserMiddleware(authorize?: ((req: Request) => Promise<Authorizable | undefined>)): (req: Request, res: Response, next: NextFunction) => Promise<void>;
