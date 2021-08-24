const passport = require("passport");
const {Strategy: GoogleStrategy} = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require('mongoose')

const User = mongoose.model('users') // pull schema from mongoose with one argument . This is model class

passport.serializeUser((user, done) => {  // user is same as existingUser (model user)
  done(null, user.id)  // this is not as profile id, this id generated automatically by Mongo
  // this is the shortcut to reference the Mongo ID, we do not have to look at underscore ID, dot, dollar sign and so on
})

passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id})
          .then((existingUser) => {
            if (existingUser) {
              // we already have a record with given profile I
              done(null, existingUser)
            } else {
              // we don`t have a user record with this ID, make a new record!

              new User({googleId: profile.id})
                  .save()
                  .then(user => done(null, user))  // both user and new User represent the same model
              //create model instance with needed properties and save to db
            }
          })
    }
))