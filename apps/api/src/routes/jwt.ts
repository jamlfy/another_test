import passport from 'passport';
import LocalStrategy from 'passport-local';
import Jwt from 'passport-jwt';
import User from '@another/db/User';

passport.use(
  new Jwt.Strategy(
    {
      jwtFromRequest: JWT.ExtractJWT.fromAuthHeaderAsBearerToken(),
      jsonWebTokenOptions: {
        ignoreExpiration: false,
      },
      secretOrKey: 'secret',
      algorithms: ['HS256'],
    },
    function (jwt_payload, done) {
      User.findById(jwt_payload.sub)
        .then((user) =>
          done(null, user.toObject({ useProjection: true, getters: true }))
        )
        .catch((err) => done(err, false));
    }
  )
);

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    User.login(username, password)
      .then((user) =>
        done(null, user.toObject({ useProjection: true, getters: true }))
      )
      .catch((e) =>
        done(null, false, { message: 'Incorrect username or password.' })
      );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default passport;
