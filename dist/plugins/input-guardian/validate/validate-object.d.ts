export type ValidationErrorResponse = {
    message: string;
    fields: Record<string, string>;
};
export declare function validateObject(data: object, onError?: (response: ValidationErrorResponse) => never): Promise<true | ValidationErrorResponse>;
