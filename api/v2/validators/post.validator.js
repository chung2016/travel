const joi = require('joi')

const create = joi.object().keys({
  title: joi.string().trim().required(),
  content: joi.string().required(),
})

const update = joi.object().keys({
  title: joi.string().trim().required(),
  content: joi.string().required(),
})

module.exports = {
  create,
  update,
}
