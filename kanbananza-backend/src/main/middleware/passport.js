import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user";

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user || !user.verifyPassword(password)) {
            return done(false, {
              errors: "Invalid email or password",
            });
          }

          return done(user);
        })
        .catch(done);
    }
  )
);
