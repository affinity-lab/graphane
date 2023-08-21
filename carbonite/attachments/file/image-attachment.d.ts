import { RGB } from "@src/util/color";
import FileDescriptor from "@src/util/file-descriptor";
import { Dimension } from "@src/util/geometry";
import Catalog from "../catalog";
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
