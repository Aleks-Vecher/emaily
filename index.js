
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send({hi: 'there'})
    }
)

const PORT = process.env.PORT || 5000
app.listen( PORT, function (){
  console.log('listen on port 5000')
})