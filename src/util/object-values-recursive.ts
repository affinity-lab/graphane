export const objectValuesRecursive = (obj: {[p: string]: any}): Array<any> => {
	if (typeof obj === "object") {
		let arr: Array<any> = [
			...Object.values(obj).map((item) => objectValuesRecursive(item))
		];
		return arr.reduce((accumulator, value) => accumulator.concat(value), []);
	}
	return obj;
};
