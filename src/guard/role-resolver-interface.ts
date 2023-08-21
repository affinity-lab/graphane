export default interface RoleResolver {
	hasRole(roles: string[]): boolean;
}
