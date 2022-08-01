const userService = require('../services/user.service')

module.exports = {
  authenticate,
  register,
  getAll,
  getCurrent,
  getById,
  update,
  delete: destroy,
}

async function authenticate(req, res, next) {
  try {
    const { email: username, password } = req.body
    const user = await userService.authenticate(username, password)
    return user
      ? res.json(user)
      : res.status(400).json({ message: 'These credentials do not match our records.' })
  } catch (err) {
    return next(err)
  }
}

async function register(req, res, next) {
  try {
    const user = await userService.create(req.body)
    return res.json(user)
  } catch (err) {
    return next(err)
  }
}

async function getAll(req, res, next) {
  try {
    const users = await userService.getAll()
    return res.json(users)
  } catch (err) {
    return next(err)
  }
}

async function getCurrent(req, res, next) {
  try {
    const user = await userService.getById(req.user.sub)
    return user ? res.json(user) : res.sendStatus(404)
  } catch (err) {
    return next(err)
  }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id)
    return user ? res.json(user) : res.sendStatus(404)
  } catch (err) {
    return next(err)
  }
}

async function update(req, res, next) {
  try {
    const user = await userService.update(req.params.id, req.body)
    return res.json(user)
  } catch (err) {
    return next(err)
  }
}

async function destroy(req, res, next) {
  try {
    await userService.delete(req.params.id)
    return res.json({})
  } catch (err) {
    return next(err)
  }
}
