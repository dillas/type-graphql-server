import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { forgotPaswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return true
        }

        const token = v4();
        await redis.set(forgotPaswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration


        await sendEmail(email, `http://localhost:3000/user/chenge-password/${token}`)

        return true;
    }
}

