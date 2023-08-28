import sanitize from "sanitize-html";
import createFormatter from "../format/create-formatter";


export default function SanitizeHTML(target: any, key: any): void {
    createFormatter(target, key, (text: string): string => sanitize(text, {allowedTags: []}));
}
