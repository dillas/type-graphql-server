import { v4 } from "uuid";
import { redis } from "../../redis";
import { confirmUserPrefixe } from "../constants/redisPrefixes";

export const cereateConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(confirmUserPrefixe + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
