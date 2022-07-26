const userService = require('../services/user.service')
const oauthService = require('../services/oauth.service')
const bcrypt = require('bcryptjs')

module.exports = {
  register,
  login,
  logout,
  me,
  refresh,
}

async function register(req, res, next) {
  try {
    const { email, password, username, firstName, lastName } = req.body
    const user = await userService.addUser({ email, password, username, firstName, lastName })
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body
    const loginBy = username.indexOf('@') === -1 ? 'username' : 'email'
    const user = await userService.findUser(username, loginBy)
    if (!user || !bcrypt.compareSync(password, user.password)) {
      const e = new Error('These credentials do not match our records.')
      e.statusCode = 400
      throw e
    }
    const { refreshToken, accessToken } = await oauthService.generateToken(user, user.id)

    return res.status(200).json({ refreshToken, accessToken, user })
  } catch (error) {
    next(error)
  }
}

async function logout(req, res, next) {
  try {
    const { accessToken } = req
    await oauthService.revokeToken(accessToken)
    return res.status(204).json()
  } catch (error) {
    next(error)
  }
}

async function me(req, res, next) {
  try {
    const { sub: userId } = req.user
    const { password, ...user } = (await userService.findById(userId)).toJSON()
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

async function refresh(req, res, next) {
  try {
    const { token } = req.body
    const { refreshToken, accessToken } = await oauthService.refreshToken(token)
    return res.status(200).json({ refreshToken, accessToken })
  } catch (error) {
    next(error)
  }
}
