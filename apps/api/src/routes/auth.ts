import { Route } from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '@another/db/User'


passport.use(new LocalStrategy(function verify(username, password, cb) {
  User.findLogin(username, password)
    .then((user) => {
      cb(null, user);
    })
    .catch((e) => {
      cb(null, false, { message: 'Incorrect username or password.' });
    })
});

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


const auth = Route();
