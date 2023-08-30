import sanitize from "sanitize-html";
import {createFormatter} from "../format/create-formatter";
import {InputGuardianError} from "../input-guardian-error";


export function SanitizeHTML(target: any, key: any): void {
	createFormatter(target, key, (text: string): string => {
		const clear: string = sanitize(text, {allowedTags: []});
		if (clear !== text) throw InputGuardianError.sanitization(`${target}'s ${key} got unsanitary input: ${text}`, {target, key, text});
		return clear;
	});
}
