import FileDescriptor from "../../../util/file-descriptor";
import {Field, ObjectType} from "type-graphql";
import Catalog from "../catalog";
import FileAttachment from "./file-attachment";
import AttachmentError from "../attachment-error";
import sharp from "sharp";


@ObjectType()
class ImgDimension {
	@Field() width: number;
	@Field() height: number;
}

@ObjectType()
class ImgRGB {
	@Field() r: number;
	@Field() g: number;
	@Field() b: number;
}

export enum ImgFocus {
	CENTRE = "centre",
	TOP = "top",
	LEFT = "left",
	BOTTOM = "bottom",
	RIGHT = "right",
	ENTROPY = "entropy",
	ATTENTION = "attention"
}

@ObjectType()
export default class ImageAttachment extends FileAttachment {
	static mimeTypePattern: string = "image/*";

	@Field(() => ImgDimension)
	public dimensions: ImgDimension;

	@Field(() => ImgRGB)
	public dominant: ImgRGB;

	@Field()
	public isAnimated: boolean;

	@Field()
	public focus: ImgFocus = ImgFocus.ATTENTION;

	static async factory(descriptor: FileDescriptor, catalog: Catalog): Promise<ImageAttachment> {
		let image: ImageAttachment = new ImageAttachment();
		await this.setup(image, descriptor, catalog);
		return image;
	};

	protected static async setup(image: ImageAttachment, descriptor: FileDescriptor, catalog: Catalog): Promise<void> {
		if (!descriptor.isImage) {
			throw AttachmentError.imageExpected();
		}
		let img: { meta: sharp.Metadata, stats: sharp.Stats } | null = await descriptor.image;
		if (img === null) {
			throw AttachmentError.imageExpected();
		}
		await super.setup(image, descriptor, catalog);
		image.dimensions = {width: img.meta.width || 0, height: img.meta.height || 0};
		image.dominant = img.stats.dominant;
		image.isAnimated = img.meta.pages ? img.meta.pages > 1 : false;
	};
}
