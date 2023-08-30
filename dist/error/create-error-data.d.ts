type errorType = {
    info?: Record<string, any>;
    message?: string;
    status: number;
    silent: boolean;
};
export declare function createErrorData(info?: Record<string, any>, message?: string, status?: number, silent?: boolean): errorType;
export {};
