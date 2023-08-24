import error from "./error";


const GraphaneError = {
    fatal: (message?: string, info?: Record<string, any>) => error({message, info}),
    application: {
        notFound: () => error(),
        alreadyRegistered: (app: string) => error({app})
    },
    module: {
        notFound: () => error(),
        alreadyRegistered: (module: string) => error({module})
    },
    input: {
        validation: (message: string, fields: Record<string, string>) => error({fields}, message)
    },
    upload: {
        badToken: () => error(),
        failed: (message: string) => error(undefined, message),
        validation: {
            tooManyAttachments: (count: number) => error({count}),
            tooLarge: (size: number) => error({size}),
            mimeTypeMismatch: (pattern: string | Array<string>) => error({pattern})
        }
    },
    attachment: {
        imageExpected: () => error(),
        fileCrud: {
            badInput: (err: string) => error({error: err}),
            unknownCommand: (err: string) => error({command: err}),
            fileNotExists: () => error(),
            fileAlreadyExists: (name: string) => error({name})
        }
    },
    crud: {
        unrealEntityTarget: (target: string | any) => error({target}),
        badRelationType: () => error()
    },
    guard: {
        unauthorized: () => error(undefined, undefined, 401),
        forbidden: () => error(undefined, undefined, 403),
        alreadyLoggedIn: () => error(undefined, undefined, 403)
    }
};

error.preprocess(GraphaneError, "GRAPHANE");
export default GraphaneError;
