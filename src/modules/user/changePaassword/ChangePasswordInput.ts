import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
export class ChengePasswordInput extends PasswordInput {
    @Field()
    token: string


}

