import secrets from "secret-sharing.js"
import hex from "hexyjs"

export function combineKey(slices: string[]): string {
   const comb = secrets.combine( slices );
   return hex.hexToStr(comb) || ""
}