const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')
const {Mailer, mailgun} = require('../services/Mailer')


const Survey = mongoose.model('surveys') // this is an mongoose instance of a survey

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
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
      res.send(user)
    } catch (e) {
      res.status(422).send(e) //status mean that something wrong and we send entire message
      console.log(e.message)
    }
  })
}