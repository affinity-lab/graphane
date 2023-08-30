import {Ctx, Field, ObjectType, Resolver} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";
import Context from "../../graphane/server/context";
import Application from "../../graphane/application/application";
import AbstractGuard from "./guard/abstract-guard";
import Authorizable from "./authorizable";
import CurrentApplication from "../../graphane/application/current-application";
import CurrentAuthorized from "./current-authorized";


@ObjectType()
export class Permissions {

	@Field(() => GraphQLJSONObject) public roles: {
		[key: string]: boolean
	};

	constructor(roles: {
		[key: string]: boolean
	}) {this.roles = roles;}
}

export default class PermissionResolver {
	constructor(private currentApplication: CurrentApplication, private currentAuthorized: CurrentAuthorized) {}

	create(app: Application, guardFactory: (app: Application, authorizable: Authorizable | undefined) => AbstractGuard): any {
		const currentApplication = this.currentApplication;
		const currentAuthorized = this.currentAuthorized;

		@Resolver(Permissions)
		class PermissionResolver {
			@app.px.Query(() => Permissions, {description: "Return the values of all exportRole guards of the app"})
			async getMyPermissionsInApp(@Ctx() ctx: Context): Promise<Permissions> {
				return new Permissions(await guardFactory(
					currentApplication.get(ctx.request),
					currentAuthorized.get(ctx.request)
				).getRoles());
			}
		}

		return PermissionResolver;
	}
}