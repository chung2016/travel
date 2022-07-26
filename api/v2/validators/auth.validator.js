const joi = require('joi')

const login = joi.object().keys({
  username: joi.string().trim().required(),
  password: joi.string().required(),
})

const register = joi.object().keys({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().min(3).max(15).required(),
  username: joi.string().trim().min(3).max(15).pattern(new RegExp('^[a-z0-9_-]+$')).required(),
  firstName: joi.string().trim().min(2).max(30).required(),
  lastName: joi.string().trim().min(2).max(30).required(),
})

const refresh = joi.object().keys({
  token: joi.string().required(),
})

module.exports = {
  login,
  register,
  refresh,
}
