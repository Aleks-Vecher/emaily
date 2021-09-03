const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
// const {combineReducers} = require("redux");
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')
const keys = require('../config/keys')
const mg = require('../services/Mailer')

const Survey = mongoose.model('surveys') // this is an mongoose instance of a survey

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const {title, subject, body, recipients} = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id, // Mongo id
      dateSent: Date.now()
    })

    // Great place to send an email
    const mailerData = new Mailer(survey, surveyTemplate(survey))
    try {
      mg.messages.create(`${keys.MailGunDomain}`, mailerData).then(msg => console.log(m4444))
    } catch (e){
      console.log(e.message)
    }
  })
}