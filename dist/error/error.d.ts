type errorType = {
    info?: Record<string, any>;
    message?: string;
    status: number;
    silent: boolean;
};
export default function error(info?: Record<string, any>, message?: string, status?: number, silent?: boolean): errorType;
export {};
