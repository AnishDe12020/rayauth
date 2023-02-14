import { use } from "passport";
import Github from "passport-github2"
import { GITID, GITSECRET } from "src/constant";

export function initGithub() {
use(new Github.Strategy({
    clientID: GITID,
    clientSecret: GITSECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
   console.log(accessToken)
   console.log(refreshToken)
   console.log(profile)
   done(null,profile)
  }
));
}