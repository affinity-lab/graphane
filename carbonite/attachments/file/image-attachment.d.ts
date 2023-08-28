import FileDescriptor from "../../../util/file-descriptor";
import Catalog from "../catalog";
import FileAttachment from "./file-attachment";
declare class ImgDimension {
    width: number;
    height: number;
}
declare class ImgRGB {
    r: number;
    g: number;
    b: number;
}
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
    dimensions: ImgDimension;
    dominant: ImgRGB;
    isAnimated: boolean;
    focus: ImgFocus;
    static factory(descriptor: FileDescriptor, catalog: Catalog): Promise<ImageAttachment>;
    protected static setup(image: ImageAttachment, descriptor: FileDescriptor, catalog: Catalog): Promise<void>;
}
export {};
