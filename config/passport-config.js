
const passport = require('passport')
const keys = require('./secrets.js')
const User = require('../models/users-model.js')
const GitHubStrategy = require('passport-github2').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  User.findById(user.id).then((user) => {
    done(null, user);
  })

  passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:6555/api/auth/github/callback'
    }, (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      done(null, profile)
    }


  ))

  passport.use(new GoogleStrategy({
    clientID: keys.google.clientID || 'test',
    clientSecret: keys.google.clientSecret || 'test',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));