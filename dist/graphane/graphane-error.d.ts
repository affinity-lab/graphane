declare const GraphaneError: {
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
};
export default GraphaneError;
