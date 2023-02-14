export const PORT: number = Number(process.env.PORT) || 4000;
export const HOST: string = process.env.HOST || 'localhost';
export const MONGOPASS: string = process.env.MONGO || 'NOT-FOUND';
export const PROJECTID: string = process.env.ID || 'NOT-FOUND';
export const TOKEN: string = process.env.TOKEN || 'NOT-FOUND';

export const GITID: string = process.env.GITHUB_ID || "NOTFOUND"
export const GITSECRET: string = process.env.GITHUB_SECRET || "NOTFOUND"