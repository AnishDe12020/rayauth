import jwt from "jsonwebtoken";
import { SECERET } from "../constant";

export function createToken(
  id: string,
  email: string,
  address: string
): string {
  const token = jwt.sign(
    {
      email: email,
      id: id,
      address: address,
      time: Date().toString(),
    },
    SECERET
  );
  return token;
}
