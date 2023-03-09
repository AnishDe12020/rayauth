import secret from "secret-sharing.js";

export function sliceKey(key: string): string[] {
  const shares = secret.share(secret.str2hex(key), 3, 2);
  return shares;
}

export function combineKey(keys: string[]): string {
  const shares = secret.combine(keys, 4);
  return shares;
}
