import passport from "passport"
import { Router } from "express"

const dcallback: Router =  Router();

dcallback.get('/auth/discord/callback', 
  passport.authenticate('discord', { failureRedirect: '/login' }),
  function(_, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


export default dcallback as Router;