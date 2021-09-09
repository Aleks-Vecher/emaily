const passport = require("passport");

module.exports = (app) => {
  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get(
      '/auth/google/callback',
      passport.authenticate('google'),  // passport.authenticate('google') - this actually a middleware
      (req, res) => {   //after the middleware finished its redirect to another middleware. we should to write the action for pass /auth/google/callback
        res.redirect('/surveys')
      }
  );


  app.get('/api/logout', (req, res) => {
    req.logout() //kills cookie and ID of user
    // res.send(req.user) // you should always get back and says underfind or no content
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    try{
      res.send(req.user)
    }catch (e){
      e.message
    }
  })
}