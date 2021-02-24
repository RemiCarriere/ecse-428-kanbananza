import Users from "../models/user";
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done( false, {
              errors: "Invalid email or passwprd",
            });
          }

          return done(user);
        })
        .catch(done);
    }
  )
);
