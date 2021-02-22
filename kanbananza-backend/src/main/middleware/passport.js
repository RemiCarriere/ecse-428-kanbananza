import Users from "../models/user";
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
    },
    (email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
