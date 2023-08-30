declare const InputGuardianError: {
    validation: (message: string, fields: Record<string, string>) => {
        info?: Record<string, any> | undefined;
        message?: string | undefined;
        status: number;
        silent: boolean;
    };
};
export default InputGuardianError;
