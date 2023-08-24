declare function error(info?: {
    [p: string]: any;
}, message?: string, status?: number, silent?: boolean): {
    info?: {
        [p: string]: any;
    } | undefined;
    message?: string | undefined;
    status: number;
    silent: boolean;
};
declare namespace error {
    var preprocess: (errors: {
        [p: string]: any;
    }, prefix?: string) => void;
}
export default error;
