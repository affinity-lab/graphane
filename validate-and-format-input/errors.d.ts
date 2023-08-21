export declare const validation: (message: string, fields: Record<string, string>) => {
    info?: {
        [p: string]: any;
    } | undefined;
    message?: string | undefined;
    status: number;
    silent: boolean;
};
