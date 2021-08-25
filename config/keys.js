// keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
// we are in production - return the prod set of keys
  module.exports = require('./prod') // import prod file and exports immediately

} else {
// we are in development  -  return the dev keys!!!
  module.exports = require('./dev') // import dev file and exports immediately
}
