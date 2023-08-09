import Catalog from "../../../carbonite/attachments/catalog";
import { RGB } from "../../../util/color";
import FileDescriptor from "../../../util/file-descriptor";
import { Dimension } from "../../../util/geometry";
import FileAttachment from "./file-attachment";
export declare enum ImgFocus {
    CENTRE = "centre",
    TOP = "top",
    LEFT = "left",
    BOTTOM = "bottom",
    RIGHT = "right",
    ENTROPY = "entropy",
    ATTENTION = "attention"
}
export default class ImageAttachment extends FileAttachment {
    static mimeTypePattern: string;
    dimensions: Dimension;
    dominant: RGB;
    isAnimated: boolean;
    focus: ImgFocus;
    static factory(descriptor: FileDescriptor, catalog: Catalog): Promise<ImageAttachment>;
    protected static setup(image: ImageAttachment, descriptor: FileDescriptor, catalog: Catalog): Promise<void>;
}