import {Context} from "./context";


export default async function authChecker({context}: {context: Context}, roles: string[]): Promise<boolean> {
    if (context.authorizable) {
        return context.authorizable.hasRole(roles);
    }
    return false;
}
