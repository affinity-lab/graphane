declare const AttachmentError: {
    upload: {
        badToken: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        failed: (message: string) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        validation: {
            tooManyAttachments: (count: number) => {
                info?: {
                    [p: string]: any;
                } | undefined;
                message?: string | undefined;
                status: number;
                silent: boolean;
            };
            tooLarge: (size: number) => {
                info?: {
                    [p: string]: any;
                } | undefined;
                message?: string | undefined;
                status: number;
                silent: boolean;
            };
            mimeTypeMismatch: (pattern: string | Array<string>) => {
                info?: {
                    [p: string]: any;
                } | undefined;
                message?: string | undefined;
                status: number;
                silent: boolean;
            };
        };
    };
    imageExpected: () => {
        info?: {
            [p: string]: any;
        } | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
    fileCrud: {
        badInput: (err: string) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        unknownCommand: (err: string) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        fileNotExists: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        fileAlreadyExists: (name: string) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
};
export default AttachmentError;
