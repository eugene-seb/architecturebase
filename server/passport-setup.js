const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(
    new GoogleStrategy(
        {
            clientID: "590521076034-j0it1s36eps684f9keucoba8bfjpcq2n.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);
