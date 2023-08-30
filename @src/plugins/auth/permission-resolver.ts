import {Ctx, Field, ObjectType, Resolver} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";
import {Context} from "../../graphane/server/context";
import {Application} from "../../graphane/application/application";
import {AbstractGuard} from "./guard/abstract-guard";


@ObjectType()
export class Permissions {
	@Field(() => GraphQLJSONObject)
	public roles: Record<string, boolean>;

	constructor(roles: Record<string, boolean>) {
		this.roles = roles;
	};
}

export function createPermissionResolver(app: Application, guard: (ctx: Context) => Promise<AbstractGuard>): any {
	@Resolver(Permissions)
	class PermissionResolver {
		@app.px.Query(() => Permissions, {description: "Return the values of all exportRole guards of the app"})
		async getMyPermissionsInApp(@Ctx() context: Context): Promise<Permissions> {
			return new Permissions(await (await guard(context)).getRoles());
		};
	}

	return PermissionResolver;
}
