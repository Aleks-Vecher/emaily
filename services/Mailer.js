const keys = require('../config/keys')
const mailgun = require('mailgun-js')({apiKey: keys.MailGunApiKey, domain: keys.MailGunDomain});

class Mailer {
  constructor({ recipients, subject}, content) {
    this.from = 'aliaksandr.vechar@gmail.com';
    this.to = this.formatAddresses(recipients);
    this.subject = subject;
    this.text = content;
    this.html = content;
    this.o = 'tracking-clicks';
  }

  formatAddresses(recipients) {
    return recipients.map(({email}) => email)
  }
}

module.exports = { mailgun, Mailer }




