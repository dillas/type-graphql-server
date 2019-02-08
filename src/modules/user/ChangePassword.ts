import { Arg, Mutation, Resolver, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPaswordPrefix } from "../constants/redisPrefixes";
import { ChengePasswordInput } from "./changePaassword/ChangePasswordInput";
import bcrypt from "bcryptjs";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async chengePassword(@Arg("data") { token, password }: ChengePasswordInput, @Ctx() ctx: MyContext): Promise<User | null> {
        const userId = await redis.get(forgotPaswordPrefix + token);

        if (!userId) {
            return null
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null
        }

        await redis.del(forgotPaswordPrefix + token);

        user.password = await bcrypt.hash(password, 12);

        await user.save();
        ctx.req.session!.userId = user.id;

        return user;

    }
}


