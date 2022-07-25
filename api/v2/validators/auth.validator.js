const joi = require('joi')

const login = joi.object().keys({
  email: joi.string().email().trim().required(),
  password: joi.string().required(),
})

const register = joi.object().keys({
  email: joi.string().email().trim().required(),
  password: joi.string().min(3).max(15).required(),
  username: joi.string().min(3).max(15).trim().pattern('^[a-z0-9_-]+$').required(),
  firstName: joi.string().min(2).max(30).trim().required(),
  lastName: joi.string().min(2).max(30).trim().required(),
})

const refresh = joi.object().keys({
  token: joi.string().required(),
})

module.exports = {
  login,
  register,
  refresh,
}
