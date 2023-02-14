import passport from "passport"
import { Router } from "express"

const login: Router =  Router();


login.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));


export default login as Router;