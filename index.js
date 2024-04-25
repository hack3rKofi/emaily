const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./config/keys')


const app = express();
// Initialize Passport middleware for authentication
app.use(passport.initialize());

passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,

  // The following are the Google OAuth 2.0 client ID and secret used for authentication
  callbackURL: '/auth/google/callback'
  
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)
  console.log('profile', profile)
}))

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
