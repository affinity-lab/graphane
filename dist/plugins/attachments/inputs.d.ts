import { IdInput } from "../../graphane/carbonite/id-input";
import { ImgFocus } from "./file/image-attachment";
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
