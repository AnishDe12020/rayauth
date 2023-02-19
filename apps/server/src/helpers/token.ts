import jwt from "jsonwebtoken";
import { SECERET } from "../constant";
export function createToken(id: string, email: string): string {
  const token = jwt.sign(
    {
      email: email,
      id: id,
      time: Date().toString(),
    },
    SECERET
  );
  return token;
}
