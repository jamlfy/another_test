import { Route } from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import Jwt from "passport-jwt";
import User from '@another/db/User';

var opts = {}
opts.jwtFromRequest = Jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

passport.use(new Jwt.Strategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

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
