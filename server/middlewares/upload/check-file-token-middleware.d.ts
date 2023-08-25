import { NextFunction, Request, Response } from "express";
import { UploadTokenPayload } from "../../upload-token-payload";
import { Jwt } from "../../../util/jwt";
export default function checkFileTokenMiddleware(jwt: Jwt<UploadTokenPayload>): (req: Request, res: Response, next: NextFunction) => void;
