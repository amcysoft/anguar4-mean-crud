var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('./models/user');
var config = require('./config').config;

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.google = passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {

        var updationData = {
            username: profile.email,
            email: profile.email,
            OauthId: profile.id,
            OauthToken: accessToken
        };
        if (profile.name.givenName) {
            updationData.first_name = profile.name.givenName;
            updationData.last_name = profile.name.familyName;
        }
        User.findOne({ OauthId: profile.id }, function (err, user) {
            if (err) {
                done(err);
            } else if (user != null) {
                done(null, user);
            } else {
                User.findOneAndUpdate({ email: profile.email }, updationData, { upsert: true }, function (err, u) {
                    if (err) {
                        done(err);
                    } else {
                        done(null, u);
                    }
                });
            }
        });
    }
));