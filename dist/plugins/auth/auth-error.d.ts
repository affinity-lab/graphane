declare const AuthError: {
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
};
export default AuthError;
