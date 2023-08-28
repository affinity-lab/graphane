export type ValidationErrorResponse = {
    message: string;
    fields: Record<string, string>;
};
export default function validateObject(data: object, onError?: (response: ValidationErrorResponse) => never): Promise<true | ValidationErrorResponse>;
