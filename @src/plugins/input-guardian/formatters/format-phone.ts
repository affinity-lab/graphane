import createFormatter from "../format/create-formatter";


export default function FormatPhone(target: any, key: any): void {
	createFormatter(target, key, (text: string): string => {
		return text.replace(/[+\-\/]/, "");
	});
}
