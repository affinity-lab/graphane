import {Express} from "express";
import {checkFileTokenMiddleware} from "../middlewares/upload/check-file-token-middleware";
import {uploadFileMiddleware} from "../middlewares/upload/upload-file-middleware";
import {handleFileMiddleware} from "../middlewares/upload/handle-file-middleware";
import {Jwt} from "../service-interfaces";
import {CurrentAuthorized} from "../../auth/current-authorized";
import {UploadTokenPayload} from "../upload-token-payload";


export function createUploadRoute(
	exp: Express,
	endpoint: string,
	uploadOptions: Record<string, any>,
	currentAuthorized: CurrentAuthorized,
	jwt: Jwt<UploadTokenPayload>
): void {
	exp.use(
		endpoint,
		checkFileTokenMiddleware(jwt, currentAuthorized),
		uploadFileMiddleware(uploadOptions),
		handleFileMiddleware()
	);
}
