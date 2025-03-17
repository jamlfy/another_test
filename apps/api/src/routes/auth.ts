import { Route } from "express";
import jwt from "jsonwebtoken";
import User from '@another/db/User';

import passport from "./jwt";

const auth = Route();

auth.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => res.json(req.user));

auth.post('/login', passport.authenticate('local', {
  failureMessage: true
}), (req, res, next) => {
  res
    .status(200)
    .json({ 
      message: "user logged in",
      token: jwt.sing(req.user, "secret")
    });
});

auth.post('/logout', (req, res, next) => {
  req.logout(function(error) {
    res
      .status(200)
      .json({ 
        message: "user logged out",
        error
      });
  });
});

auth.post('/signup', (req, res, next) => {
  const user = new User({ email: req.body.email });
  user.hash(req.body.password)
    .then((e) => e.save())
    .then(e => {
      res
        .status(200)
        .json({ 
          message: "user logged in",
          token: jwt.sing(e, "secret")
        });
    })
    .catch((err) => {
      res
        .status(502)
        .json({ 
          message: "user logged out",
          error
        });
    })
});

export default auth: