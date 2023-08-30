export declare const InputGuardianError: {
    validation: (message: string, fields: Record<string, string>) => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
    sanitization: (message: string, info: Record<string, any>) => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
};
