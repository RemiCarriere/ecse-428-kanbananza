import passport from "passport";
import LocalStrategy from "passport-local";
import Users from "../models/user";

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(false, {
              errors: "Invalid email or passwprd",
            });
          }

          return done(user);
        })
        .catch(done);
    }
  )
);
