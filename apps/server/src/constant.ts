export const PORT: number = Number(process.env.PORT) || 8080;
export const HOST: string = process.env.HOST || "localhost";
export const MONGOPASS: string = process.env.DATABASE_URL || "NOT-FOUND";

export const SECERET: string = process.env.SECERET || "NOT-FOUND";
export const TOKEN: string = process.env.TOKEN || "NOT-FOUND";

export const GITID: string = process.env.GITHUB_ID || "NOTFOUND";
export const GITSECRET: string = process.env.GITHUB_SECRET || "NOTFOUND";

export const DSID: string = process.env.DISCORD_ID || "NOTFOUND";
export const DSSECRET: string = process.env.DISCORD_SECRET || "NOTFOUND";

export const GID: string = process.env.GOOGLE_ID || "NOTFOUND";
export const GSECRET: string = process.env.GOOGLE_SECRET || "NOTFOUND";

export const PASS: string = process.env.PASS || "NOTFOUND";
export const EMAIL: string = process.env.EMAIL || "NOTFOUND";

export const DB1: string = process.env.DATABASE_URL || "NOTFOUND";
export const DB2: string = process.env.DB_TWO || "NOTFOUND";
export const DB3: string = process.env.DB_THREE || "NOTFOUND";

export const TESTP: string = process.env.TEST || "NOTFOUND";

export const BASE_URL: string = process.env.BASE_URL || "http://localhost:8080";
export const FRONTEND_URL: string =
  process.env.FRONTEND_URL || "http://localhost:3000";
