const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
var GoogleOneTapStrategy =
    require("passport-google-one-tap").GoogleOneTapStrategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(
    new GoogleStrategy(
        {
            clientID:
                "590521076034-j0it1s36eps684f9keucoba8bfjpcq2n.apps.googleusercontent.com",
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

passport.use(
    new GoogleOneTapStrategy(
        {
            clientID: "590521076034-qevao0sekmpnfb6if60oobcv74h874pv.apps.googleusercontent.com", // your google client ID
            clientSecret: "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", // your google client secret
            verifyCsrfToken: false, // whether to validate the csrf token or not
        },
        function (profile, done) {
            // Here your app code, for example:
            //User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //    return done(err, user);
            //});

            return done(null, profile);
        }
    )
);
