const jwt = require('jsonwebtoken')

function authUser(req, res, next) {
  const authHeader = req.headers['authorization'] || ''
  const [, token] = authHeader && authHeader.split(' ')

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      const error = new Error('Access denied. Invalid token.')
      error.statusCode = 401
      throw error
    }
    req.user = user
    next()
  })
}

module.exports = authUser
