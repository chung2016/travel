const testingService = require('../services/testing.service')

module.exports = {
  randomFace,
  removeUnused,
}

async function randomFace(req, res, next) {
  try {
    const { gender: reqGender = 'male' } = req.query
    const gender = ['male', 'female'].includes(reqGender) ? reqGender : 'male'
    const imageUrl = await testingService.randomFace(gender)
    return res.json({ imageUrl })
  } catch (error) {
    next(error)
  }
}

async function removeUnused(req, res, next) {
  try {
    const result = await testingService.removeUnused()
    return res.json(result)
  } catch (error) {
    next(error)
  }
}
