import { ImgFocus } from "./file/image-attachment";
import { IdInput } from "../id-input";
export declare class FileInputVariables {
    fileName?: string;
    newName?: string;
    index?: number;
    title?: string;
    imageFocus?: ImgFocus;
}
export declare class ChangeFileInput extends IdInput {
    command: "upload" | "delete" | "rename" | "reorder" | "giveTitle" | "changeImageFocus";
    catalog: string;
}
