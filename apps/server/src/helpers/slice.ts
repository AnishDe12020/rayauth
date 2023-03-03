import secret from "secret-sharing.js";
import hex from "hexyjs";

export function sliceKey(key: string): string[] {
  const shares = secret.share(hex.strToHex(key), 3, 2);
  return shares;
}

export function combineKey(keys: string[]): string {
  const shares = secret.combine(keys);
  return shares;
}
