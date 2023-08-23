import {Ctx, Field, ObjectType, Resolver} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";
import {Context} from "../server/context";
import Application from "./application";
import AbstractGuard from "../guard/abstract-guard";


@ObjectType()
class Permissions {
	@Field(() => GraphQLJSONObject)
	public roles: {[key: string]: boolean};

	constructor(roles: {[key: string]: boolean}) {
		this.roles = roles;
	};
}

export function createRolesResolver(app: Application, guard: (ctx: Context) => AbstractGuard): any {
	@Resolver(Permissions)
	class PermissionResolver {
		@app.px.Query(() => Permissions, {description: "Return the values of all exportRole guards of the app"})
		async getMyPermissionsInApp(@Ctx() context: Context): Promise<Permissions> {
			return new Permissions(await guard(context).getRoles());
		};
	}
	return PermissionResolver;
}
