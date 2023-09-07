import { Express } from "express";
import { Jwt } from "../service-interfaces";
import { CurrentAuthorized } from "../../auth/current-authorized";
import { UploadTokenPayload } from "../upload-token-payload";
export declare function createUploadRoute(exp: Express, endpoint: string, uploadOptions: Record<string, any>, currentAuthorized: CurrentAuthorized, jwt: Jwt<UploadTokenPayload>): void;
