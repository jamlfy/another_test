import { Route } from "express";
import passport from "./jwt";

const auth = Route();


auth.get('/profile', passport.authenticate('jwt', {
  successReturnToOrRedirect: '/',
  failureMessage: true
}), function(req, res, next) {

});

auth.post('/login/password', passport.authenticate('local', {
  failureRedirect: '/profile',
  failureMessage: true
}));


router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


auth.post('/signup', function(req, res, next) {

  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }
    db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      req.body.username,
      hashedPassword,
      salt
    ], function(err) {
      if (err) { return next(err); }
      var user = {
        id: this.lastID,
        username: req.body.username
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
});

export default auth: