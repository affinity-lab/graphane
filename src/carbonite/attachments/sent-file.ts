export type SentFile = {
    name: string,
    mv: (uploadPath: string, callback?: (error: Error) => any) => Promise<any>,
    mimetype: string,
    tempFilePath: string,
    truncated: boolean,
    size: number,
    md5: () => string
};
