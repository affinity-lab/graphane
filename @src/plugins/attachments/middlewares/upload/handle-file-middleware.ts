import Module from "../../../../graphane/module/module";
import Atom from "../../../../graphane/carbonite/atom";
import Catalog from "../../catalog";
import {SentFile} from "../../sent-file";
import {Request, Response} from "express";
import * as fs from "fs";
import {UploadTokenPayload} from "../../upload-token-payload";
import AttachmentError from "../../attachment-error";
import AtomWithAttachments from "../../atom-with-attachments";


export default function handleFileMiddleware() {
	return async (req: Request, res: Response): Promise<void> => {
		if (!req.files || Object.keys(req.files).length === 0) {
			throw AttachmentError.upload.failed("Unsuccessful file upload");
		}
		const token: UploadTokenPayload = req.context.get("uploadTokenPayload");
		const entityType: typeof Atom | undefined = Module.get(token.module)?.entities[token.entity];
		if (typeof entityType === "undefined") {
			throw AttachmentError.upload.failed(`Upload to not existing entityType: ${token.module}/${token.entity}`);
		}
		if (!(entityType.prototype instanceof AtomWithAttachments)) {
			throw AttachmentError.upload.failed(`Upload to entity with no attachments: ${entityType.Ident}`);
		}
		const withAttachments = entityType as typeof AtomWithAttachments;
		const entity: AtomWithAttachments | null = await withAttachments.findOneBy({id: token.id});
		if (entity == null) {
			throw AttachmentError.upload.failed(`Upload to not existing entity: ${entityType.Ident}#${token.id}`);
		}
		let file: SentFile;
		const catalog: Catalog | undefined = entity.getCatalog(token.catalog);
		if (typeof catalog === "undefined") {
			throw AttachmentError.upload.failed(`Entity: ${entity.ident} has no Catalog: ${token.catalog}`);
		}
		for (let key in req.files) {
			file = req.files[key];
			fs.mkdirSync(file.tempFilePath + "-dir");
			fs.renameSync(file.tempFilePath, file.tempFilePath + "-dir/" + file.name);
			await catalog.addFiles(file.tempFilePath + "-dir/" + file.name);
			fs.readdirSync(file.tempFilePath + "-dir").forEach(f => fs.unlinkSync(file.tempFilePath + "-dir/" + f));
			fs.rmdirSync(file.tempFilePath + "-dir");
		}
		res.sendStatus(200);
	};
}
