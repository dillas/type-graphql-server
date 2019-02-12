import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import {
  CreaterProductResolver,
  CreateUserResolver
} from "../modules/user/CreateUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { ProfilePictureResolver } from "../modules/user/PrifilePicture";
import { RegisterResolver } from "../modules/user/Register";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreaterProductResolver,
      ProfilePictureResolver
    ],
    authChecker: ({ context: { req } }) => {
      // here you can read user from context
      // and check his permission in db against `roles` argument
      // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]

      return !!req.session.userId;
    }
  });
