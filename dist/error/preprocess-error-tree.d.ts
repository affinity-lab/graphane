import { GraphQLError } from "graphql/index";
export declare class GraphaneException extends GraphQLError {
    extensions: {
        graphane: {
            info?: Record<string, any>;
            message?: string;
            status: number;
            silent: boolean;
            code: string;
        };
    };
    get status(): number;
    get errorData(): {
        code: string;
        message: string | undefined;
        info: Record<string, any> | undefined;
    };
}
export declare function preprocessErrorTree(errors: Record<string, any>, prefix?: string): void;
