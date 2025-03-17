import passport from 'passport';
import LocalStrategy from 'passport-local';
import Jwt from "passport-jwt";
import User from '@another/db/User';

passport.use(new Jwt.Strategy({
    jwtFromRequest: JWT.ExtractJWT.fromAuthHeaderAsBearerToken(),
    jsonWebTokenOptions: {
      ignoreExpiration: false,
    },
    secretOrKey: secret,
    algorithms: ['HS256'],
}, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub})
      .then((user) => done(null, user))
      .catch(err => done(err, false));
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

export default passport;