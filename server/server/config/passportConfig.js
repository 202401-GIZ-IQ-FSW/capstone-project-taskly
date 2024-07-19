// server\server\config\passportConfig.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

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
      callbackURL: 'https://tickets-backend-ahmedesam24.replit.app/api/v1/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await UserModel.findOne({ $or: [{ googleId: profile.id  }, { email :profile.emails[0].value}]});
        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            username: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
            password: generateRandomPassword(),
          });
          await user.save();  
        } 
          const userInfo = { id: user._id, role: user.role, username: user.username };
          const accessToken = jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
          const refreshToken = jwt.sign({ userInfo }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
          user.googleId=profile.id;
          user.refreshToken = refreshToken;
          await user.save(); 
          user.accessToken = accessToken; 
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


function generateRandomPassword() {
  const length = 10;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';

  // Ensure at least one lowercase letter, one uppercase letter, one digit, and one special character
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Generate the remaining characters randomly
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the generated password to ensure randomness
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
}
module.exports = passport;
