import {IsInt, IsPositive} from "class-validator";
import {ArgsType, Field} from "type-graphql";


@ArgsType()
export default class IdInput {
	@Field()
	@IsPositive()
	@IsInt()
	id: number;
}
