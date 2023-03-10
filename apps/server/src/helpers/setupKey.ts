import { sendMail } from "./email";
import { saveKeys } from "./save3keys";
import { sliceKey } from "./slice";
import arr from "hex-array";
import { Keypair } from "@solana/web3.js";

export async function setupKey(email: string): Promise<string[]> {
  const { publicKey, secretKey } = Keypair.generate();
  const key = arr.toString(secretKey);
  const [deviceShare, emailShare, authShare] = sliceKey(key);
  const keys = sliceKey(authShare);
  await saveKeys(keys, email);
  sendMail(email, emailShare);
  return [deviceShare, publicKey.toString()];
}

export async function userExistsKey(): Promise<string> {
  return "";
}
