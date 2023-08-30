export default function error(info?: {
    [p: string]: any;
}, message?: string, status?: number, silent?: boolean): {
    info?: {
        [p: string]: any;
    } | undefined;
    message?: string | undefined;
    status: number;
    silent: boolean;
};
