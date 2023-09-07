export interface Authorizable {
    id: number;
    hasRole(roles: string[]): Promise<boolean>;
    getRoles(): Promise<string[]>;
    getUser(...info: any[]): Promise<any>;
}
