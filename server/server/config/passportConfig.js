const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/UserModel');


// (A) Redirect the user from the browser to Google: The user presses a button in the browser
//  and gets redirected to Google where they can grant the application access to their Google account.
// (B) Return the user from Google back to the browser: After the grant, the user is redirected back to the browser with a code .
// (C) Perform the code-token exchange: Send the code from the browser to the server to be exchanged with Google. After the exchange
// , we should receive an access_token back from the service, and often a refresh_token .
// (D) Use the access token to make requests against Google APIs: With the access_token ,
//  we can now make requests to Google APIs on behalf of the user. If the access_token expires, then we can use the refresh_token to obtain a new access_token .
// set up the passport middleware

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/tickets',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            username: profile.displayName,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
            profile_picture: profile.photos[0].value,
            password: null,
          });
          await user.save();
        }
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
