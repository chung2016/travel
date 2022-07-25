const jwt = require('jsonwebtoken')

function authUser(req, res, next) {
  const authHeader = req.headers['authorization'] || ''
  const [, token] = authHeader && authHeader.split(' ')

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      const e = new Error('Access denied. Invalid token.')
      e.statusCode = 401
      throw e
    }
    req.user = user
    req.accessToken = token
    next()
  })
}

module.exports = authUser
