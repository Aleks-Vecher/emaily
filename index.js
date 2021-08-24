const express = require('express')
const  mongoose = require('mongoose')
const keys = require('./config/keys')
require('./services/passport')


mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express()

require('./routes/authRoutes')(app)

//console.developers.google.com

const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log('listen on port 5000')
})

