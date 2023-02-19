import { sendMail } from "./email";
import { saveKeys } from "./save3keys";
import { sliceKey } from "./slice";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
export async function setupKey(email: string): Promise<string[]> {
  const { publicKey, secretKey } = Keypair.generate();
  const key = base58.encode(secretKey);
  const [deviceShare, emailShare, authShare] = sliceKey(key);
  const keys = sliceKey(authShare);
  await saveKeys(keys, email);
  sendMail(email, emailShare);

  return [deviceShare, publicKey.toString()];
}
