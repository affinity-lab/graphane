import { Express } from "express";
import { Jwt, Logger } from "../service-interfaces";
import CurrentAuthorized from "../../auth/current-authorized";
import { UploadTokenPayload } from "../upload-token-payload";
export default function createUploadRoute(app: Express, endpoint: string, uploadTokenKey: string, logger: Logger, uploadOptions: Record<string, any>, currentAuthorized: CurrentAuthorized, jwt: Jwt<UploadTokenPayload>): void;
