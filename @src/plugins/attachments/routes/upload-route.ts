import {Express} from "express";
import checkFileTokenMiddleware from "../middlewares/upload/check-file-token-middleware";
import uploadFileMiddleware from "../middlewares/upload/upload-file-middleware";
import handleFileMiddleware from "../middlewares/upload/handle-file-middleware";
import {Jwt, Logger} from "../service-interfaces";
import CurrentAuthorized from "../../auth/current-authorized";
import {UploadTokenPayload} from "../upload-token-payload";


export default function createUploadRoute(
	app: Express,
	endpoint: string,
	uploadTokenKey: string,
	logger: Logger,
	uploadOptions: Record<string, any>,
	currentAuthorized: CurrentAuthorized,
	jwt: Jwt<UploadTokenPayload>
): void {
	app.use(
		endpoint,
		checkFileTokenMiddleware(jwt, currentAuthorized),
		uploadFileMiddleware(logger, uploadOptions),
		handleFileMiddleware()
	);
}
