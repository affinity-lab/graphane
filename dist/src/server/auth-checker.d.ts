import { Context } from "./context";
export default function authChecker({ context }: {
    context: Context;
}, roles: string[]): Promise<boolean>;
