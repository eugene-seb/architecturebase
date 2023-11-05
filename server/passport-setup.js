const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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
passport.use(
    new FacebookStrategy(
        {
            clientID: "6621650011252064",
            clientSecret: "1a0b46a8673fd118edd5774352295a15",
            callbackURL: "http://localhost:3000/auth/facebook/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);