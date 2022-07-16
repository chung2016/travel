const userService = require("../services/user.service");

module.exports = {
  authenticate,
  register,
  getAll,
  getCurrent,
  getById,
  update,
  delete: _delete,
};

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);
    return user
      ? res.json(user)
      : res
          .status(400)
          .json({ message: "These credentials do not match our records." });
  } catch (err) {
    return next(err);
  }
}

async function register(req, res, next) {
  try {
    const user = await userService.create(req.body);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const users = await userService.getAll();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
}

function getCurrent(req, res, next) {
  return userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  return userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

async function update(req, res, next) {
  try {
    const user = await userService.update(req.params.id, req.body);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

async function _delete(req, res, next) {
  try {
    await userService.delete(req.params.id);
    return res.json({});
  } catch (err) {
    return next(err);
  }
}
