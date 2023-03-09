import * as secret from 'secrets.js-grempe';

export function sliceKey(key: string): string[] {
  const shares = secret.share(key, 3, 2);
  return shares;
}

export function combineKey(keys: string[]): string {
  const shares = secret.combine(keys);
  return shares;
}
