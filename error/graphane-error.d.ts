declare const GraphaneError: {
    fatal: (message?: string, info?: Record<string, any>) => {
        info?: {
            [p: string]: any;
        } | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
    application: {
        notFound: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        alreadyRegistered: (app: string) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
    module: {
        notFound: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        alreadyRegistered: (module: string) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
    input: {
        validation: (message: string, fields: Record<string, string>) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
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
    attachment: {
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
    crud: {
        unrealEntityTarget: (target: string | any) => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        badRelationType: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
    guard: {
        unauthorized: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        forbidden: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        alreadyLoggedIn: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        duplicateEmail: () => {
            info?: {
                [p: string]: any;
            } | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
};
export default GraphaneError;
