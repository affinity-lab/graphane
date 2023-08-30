import { Express } from "express";
export default function createUploadRoute(app: Express, endpoint: string, fileStoragePath: string, imgStoragePath: string, imgMaxAge: string | number): void;
