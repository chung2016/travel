const postService = require('../services/post.service')

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: destroy,
}

async function getAll(req, res, next) {
  try {
    const posts = await postService.getAll()
    return res.json({ posts })
  } catch (error) {
    next(error)
  }
}

async function get(req, res, next) {
  try {
    const { id } = req.params
    const post = await postService.get(id)
    return res.json({ post })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const { sub: userId } = req.user
    const { title, content } = req.body
    await postService.create({ userId, title, content })
    return res.status(201).json()
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const post = await postService.update(id, { title, content })
    return res.json({ post })
  } catch (error) {
    next(error)
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params
    await postService.delete(id)
    return res.status(204).json()
  } catch (error) {
    next(error)
  }
}
