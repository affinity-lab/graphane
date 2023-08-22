export default interface Authorizable {
    id: number;
    hasRole(roles: string[]): boolean;
    getRoles(): string[];
    getUser(...info: any[]): any;
}
