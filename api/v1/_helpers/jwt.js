const expressJwt = require('express-jwt')
const userService = require('../services/user.service')

module.exports = jwt

function jwt() {
  const secret = process.env.JWT_SECRET
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/v1/users/authenticate',
      '/api/v1/users/register',
      { url: /\/api\/v1\/profile\/*/, methods: ['GET'] },
      { url: /\/api\/v1\/places\/*/, methods: ['GET'] },
      { url: /\/api\/v1\/comments\/*/, methods: ['GET'] },
      { url: /\/api\/v1\/upload\/*/, methods: ['GET'] },
      '/api/v1/upload',
    ],
  })
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub)

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  done()
}
