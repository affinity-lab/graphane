export type ValidationErrorResponse = {
    message: string;
    fields: Record<string, string>;
};
export declare function validateObject(data: any, onError?: (response: ValidationErrorResponse) => never): Promise<true | ValidationErrorResponse>;
