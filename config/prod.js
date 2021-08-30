// prod.js  - poduction keys here !!
// config folder is a backend side

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID ,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI ,
  cookieKey: process.env.COOKIE_KEY ,  // random key
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ,  // random key
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ,  // random key

}