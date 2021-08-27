const passport = require("passport");

module.exports = (app) => {
  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout()  //kills cookie and ID of user
    res.send(req.user) // you should always get back and says underfind or no content
  })
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}