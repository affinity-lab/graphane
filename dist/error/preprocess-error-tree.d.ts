import { GraphQLError } from "graphql/index";
export declare class GraphaneException extends GraphQLError {
}
export default function preprocessErrorTree(errors: {
    [p: string]: any;
}, prefix?: string): void;
