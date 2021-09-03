const keys = require('../config/keys')

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: keys.MailGunApiKey || '156db0f1-3f3ed3da'})

class Mailer {
  constructor({subject, recipients}, content) {
    this.from = 'aliaksandr.vechar@itechart-group.com';
    this.to = this.formatAddresses(recipients);
    this.subject = subject;
    this.text = content;
    this.html = content;
  }
  formatAddresses(recipients){
    return recipients.map(({ email }) => email)
  }
}


module.exports = mg
module.exports = Mailer

