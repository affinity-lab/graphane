/**
 * Recursively extracts values from an object's properties, including nested objects.
 * Returns the values in a flattened array. If input is not an object, it's returned as a single-element array.
 *
 * @param {Object} obj - The input object to extract values from.
 * @returns {Array} An array containing all extracted values.
 */
export declare function objectValuesRecursive(obj: Record<string, any>): Array<any>;
