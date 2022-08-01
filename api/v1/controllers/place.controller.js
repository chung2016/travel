const placeService = require('../services/place.service')

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: destroy,
  getAllByUserId,
}

async function getAll(req, res, next) {
  try {
    const places = await placeService.getAll()
    return res.json(places)
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const place = await placeService.getById(req.params.id)
    return place ? res.json(place) : res.sendStatus(404)
  } catch (err) {
    return next(err)
  }
}

async function create(req, res, next) {
  try {
    const place = await placeService.create(req.body)
    return res.json(place)
  } catch (err) {
    return next(err)
  }
}

async function update(req, res, next) {
  try {
    const place = await placeService.update(req.params.id, req.body)
    return res.json(place)
  } catch (err) {
    return next(err)
  }
}

async function destroy(req, res, next) {
  try {
    await placeService.delete(req.params.id)
    return res.json({})
  } catch (err) {
    return next(err)
  }
}

async function getAllByUserId(req, res, next) {
  try {
    const places = await placeService.getAllByUserId(req.params.userid)
    return res.json(places)
  } catch (err) {
    return next(err)
  }
}
