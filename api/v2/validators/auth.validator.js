const joi = require('joi')

const login = joi.object().keys({
  email: joi.string().email().trim().required(),
  password: joi.string().required(),
})

const register = joi.object().keys({
  email: joi.string().email().trim().required(),
  password: joi.string().min(3).max(15).required(),
  username: joi.string().min(3).max(15).required(),
  firstName: joi.string().min(2).max(30).required(),
  lastName: joi.string().min(2).max(30).required(),
})

const token = joi.object().keys({
  token: joi.string().required(),
})

module.exports = {
  login,
  register,
  token,
}
