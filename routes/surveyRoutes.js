const _ = require('lodash')
const {URL} = require('url')
const {Path} = require('path-parser')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')
const {Mailer, mailgun} = require('../services/Mailer')


const Survey = mongoose.model('surveys') // this is an mongoose instance of a survey

module.exports = app => {
  app.get('/api/surveys', requireLogin ,async (req, res) => {
   const surveys =  await Survey.find({_user: req.user.id}) // this return a query from mongoose
       .select({recipients: false}) // the find result do not include the recipients
    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')
    _.chain(req.body)
        .map((event) => {
          if (event?.url) {
            const match = p.test(new URL(event.url).pathname)
            if (match) {
              return {recipient: event.recipient, surveyId: match.surveyId, choice: match.choice}
            }
          }
        })
        .compact() // delete undefined in array
        .uniqBy('recipient')
        .uniqBy('surveyId')
        .each(({surveyId, recipient, choice}) => {
          Survey.updateOne({ // looking for the survey collection, find and update exactly one record inside that collection
            _id: surveyId, // we want to find this surveyId who has the recipient with the given email and has not responded to the survey
            recipients: {
              $elemMatch: {email: recipient, responded: false}
            }
          }, {
            $inc: {[choice]: 1}, // increment the choice
            $set: {'recipients.$.responded': true}, // update the recipient who we just found in the original query, update the respondent property to true
            lastResponded: new Date()
          }).exec()
        })
        .value()
    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
      await mailgun.messages().send(mailerData, function (error, body) {
        console.log(body);
        if (error) console.log(error);
      });
      await survey.save()
      req.user.credits -= 1;
      const user = await req.user.save()
      res.send(user) // the purpose of this is updated the header with new number of credit
    } catch (e) {
      res.status(422).send(e) //status mean that something wrong and we send entire message
      console.log(e.message)
    }
  })
}