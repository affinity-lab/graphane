/// <reference types="node" />
export type SentFile = {
    name: string;
    data: Buffer;
    size: number;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: () => string;
    mv: (uploadPath: string, callback?: (error: Error) => any) => Promise<any>;
};
