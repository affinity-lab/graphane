import {IsInt, IsOptional, IsPositive} from "class-validator";
import {ArgsType, Field, InputType} from "type-graphql";
import SanitizeHTML from "../../validate-and-format-input/formatters/sanitize-html";
import {IdInput} from "../id-input";
import {ImgFocus} from "./file/image-attachment";


@InputType()
export class FileInputVariables {
    @Field({nullable: true})
    @SanitizeHTML
    fileName?: string;

    @Field({nullable: true})
    @SanitizeHTML
    newName?: string;

    @Field({nullable: true})
    @IsOptional()
    @IsPositive()
    @IsInt()
    index?: number;

    @Field({nullable: true})
    @SanitizeHTML
    title?: string;

    @Field(() => String, {nullable: true})
    @SanitizeHTML
    imageFocus?: ImgFocus;
}

@ArgsType()
export class ChangeFileInput extends IdInput {
    @Field(() => String)
    @SanitizeHTML
    command: "upload" | "delete" | "rename" | "reorder" | "giveTitle" | "changeImageFocus";

    @Field()
    @SanitizeHTML
    catalog: string;
}
