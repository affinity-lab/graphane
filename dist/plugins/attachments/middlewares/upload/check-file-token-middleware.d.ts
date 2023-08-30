import { NextFunction, Request, Response } from "express";
import { UploadTokenPayload } from "../../upload-token-payload";
import { Jwt } from "../../service-interfaces";
import CurrentAuthorized from "../../../auth/current-authorized";
export default function checkFileTokenMiddleware(jwt: Jwt<UploadTokenPayload>, currentAuthorized: CurrentAuthorized): (req: Request, res: Response, next: NextFunction) => void;
