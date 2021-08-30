const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // if(!req.user){  // we use this as we would like to indicate logging of user
    //   return res.status(401).send({ error:  'You must log in!'})
    // } // we replace the above lines with middlewares requireLogin as second argument
    const charge = await stripe.charges.create({  // charge is a big object which say that charge of credit card is created
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id  // id of our autharization
    }) // creating a buld of our credit card
    req.user.credits += 5    //this is set up autonatically by passport (middlewares passport.initialize and passport.session) . This is User model class
    const user = await req.user.save()

    res.send(user)
  })
}

