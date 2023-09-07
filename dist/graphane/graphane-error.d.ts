export declare const GraphaneError: {
    application: {
        notFound: () => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        alreadyRegistered: (app: string) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
    module: {
        notFound: () => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        alreadyRegistered: (module: string) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
    crud: {
        unrealEntityTarget: (target: string | any) => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
        badRelationType: () => {
            info?: Record<string, any> | undefined;
            message?: string | undefined;
            status: number;
            silent: boolean;
        };
    };
};
