const userService = require("../services/user.service");

module.exports = {
  getById,
};

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id);
    return user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    return next(err);
  }
}
