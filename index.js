const express = require('express')
const  mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')  // this has to be upper then './services/passport' to be avoid error because first we creat schema'Schema hasn't been registered for model "users"'and [nodemon] app crashed - waiting for file changes before starting...
require('./services/passport')


mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express()

//tell passport to use cookies, confige options of cookies
//midlewares
app.use(
    cookieSession({
maxAge:  30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],  // this key uses to encrypt any given cookie
    })
)

// to tell passport to use cookies in our app. this two line
app.use(passport.initialize())
app.use(passport.session())




require('./routes/authRoutes')(app)

//console.developers.google.com

const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log('listen on port 5000')
})

