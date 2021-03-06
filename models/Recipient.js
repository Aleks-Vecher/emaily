const mongoose = require('mongoose')
const { Schema } = mongoose

const recipientSchema = new Schema({
  email : String,
  responded: { type: Boolean, default: false}
})

// instead of registering this schema we export it
module.exports  = recipientSchema