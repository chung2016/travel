const commentService = require('../services/comment.service')

module.exports = {
  create,
  update,
  delete: destroy,
  getByPlaceId,
}

async function create(req, res, next) {
  try {
    const comment = await commentService.create(req.body)
    return res.json(comment)
  } catch (err) {
    return next(err)
  }
}

async function update(req, res, next) {
  try {
    const comment = await commentService.update(req.params.id, req.body)
    return res.json(comment)
  } catch (err) {
    next(err)
  }
}

async function destroy(req, res, next) {
  try {
    await commentService.delete(req.params.id)
    return res.json({})
  } catch (err) {
    return next(err)
  }
}

async function getByPlaceId(req, res, next) {
  try {
    const comments = await commentService.getByPlaceId(req.params.placeid)
    return res.json(comments)
  } catch (err) {
    return next(err)
  }
}
