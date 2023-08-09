import Application from "../../application/application";
import {Context} from "../../server/context";
import {GraphQLJSONObject} from "graphql-type-json";
import {createUnionType, Ctx, Field, ObjectType, Resolver} from "type-graphql";


@ObjectType()
class Roles {
	@Field(() => GraphQLJSONObject)
	public roles: { [key: string]: boolean };

	constructor(roles: { [key: string]: boolean }) {
		this.roles = roles;
	};
}

export function createRolesResolver(app: Application, authTypes: Array<any> = []): any {
	const unionType = createUnionType({name: app.px.prefixer("authorized"), types: () => authTypes});

	@Resolver()
	class RolesResolver {
		@app.px.Query(() => Roles, {authorized: [], description: "Return"})
		async getMyRolesInApp(@Ctx() context: Context): Promise<Roles> {
			const out: Record<string, boolean> = {};
			for (let key in app.roles) {
				out[app.roles[key]] = context.authorizable!.hasRole([app.roles[key]]);
			}
			return new Roles(out);
		};

		@app.px.Query(() => unionType, {authorized: []})
		async getMyUser(@Ctx() context: Context): Promise<typeof unionType> {
			return context.authorizable!.getUser();
		};
	}

	return RolesResolver;
}
