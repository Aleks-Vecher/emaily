const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')  // this has to be upper then './services/passport' to be avoid error because first we creat schema'Schema hasn't been registered for model "users"'and [nodemon] app crashed - waiting for file changes before starting...
require('./models/Survey')
require('./services/passport')
const mail = require('./services/Mailer')
console.log(mail)
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express()

app.use(bodyParser.json()) // this middleware uses for parse the body post/put/patch request which come to app. then assign it to the req body property


// these three middlewares works for every incoming request
//tell passport to use cookies, confige options of cookies
//middlewares
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],  // this key uses to encrypt any given cookie
    })
)

// to tell passport to use cookies in our app. this two line
app.use(passport.initialize())
app.use(passport.session())


require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app )
//console.developers.google.com

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  // like or main.js file, or main.css file!
  app.use(express.static('client/build'))

  // Express will serve up the index.html file
  // if it doesn`t recognize the route.
  const path = require('path')
  app.get('*', (req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log('listen on port 5000')
  console.log(mail.client)
})

