export declare const AttachmentError: {
    upload: {
        badToken: () => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        failed: (message: string) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        validation: {
            tooManyAttachments: (count: number) => {
                info?: Record<string, any> | undefined;
                message?: string | undefined;
                status: number;
                silent: boolean;
            };
            tooLarge: (size: number) => {
                info?: Record<string, any> | undefined;
                message?: string | undefined;
                status: number;
                silent: boolean;
            };
            mimeTypeMismatch: (pattern: string | Array<string>) => {
                info?: Record<string, any> | undefined;
                message?: string | undefined;
                status: number;
                silent: boolean;
            };
        };
    };
    imageExpected: () => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
    fileCrud: {
        badInput: (err: string) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        unknownCommand: (err: string) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        fileNotExists: () => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        fileAlreadyExists: (name: string) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
};
