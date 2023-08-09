import Catalog from "../../../carbonite/attachments/catalog";
import NotImageError from "../../../carbonite/attachments/errors/not-image-error";
import {RGB} from "../../../util/color";
import FileDescriptor, {Img} from "../../../util/file-descriptor";
import {Dimension} from "../../../util/geometry";
import {Field, ObjectType} from "type-graphql";
import FileAttachment from "./file-attachment";


@ObjectType()
class ImgDimension {
    @Field()
    width: number;

    @Field()
    height: number;
}

@ObjectType()
class ImgRGB {
    @Field()
    r: number;

    @Field()
    g: number;

    @Field()
    b: number;
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
    public dimensions: Dimension;

    @Field(() => ImgRGB)
    public dominant: RGB;

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
            throw new NotImageError(descriptor);
        }
        let img: Img | null = await descriptor.image;
        if (img === null) {
            throw new NotImageError(descriptor);
        }
        await super.setup(image, descriptor, catalog);
        image.dimensions = new Dimension(img.meta.width || 0, img.meta.height || 0);
        image.dominant = img.stats.dominant;
        image.isAnimated = img.meta.pages ? img.meta.pages > 1 : false;
    };
}
