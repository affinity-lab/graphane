export declare const AuthError: {
    unauthorized: () => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
    forbidden: () => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
    alreadyLoggedIn: () => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
};
