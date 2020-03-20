require('dotenv').config()

const passport = require('passport')
const keys = require('./secrets.js')
const User = require('../auth/authenication-model.js')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github').Strategy

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {

  User.findById(user.id).then((user) => {
      done(null, user);
  });
});

// Github authentication
passport.use(new GitHubStrategy({
  clientID: keys.github.clientID  || 'test',
  clientSecret: keys.github.clientSecret || 'test',
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

// Google authentication
passport.use(new GoogleStrategy({
  clientID: keys.google.clientID || 'test',
  clientSecret: keys.google.clientSecret || 'test',
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

// Twitter authentication


// Facebook authentication


// LinkedIn auth