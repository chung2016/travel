const authService = require('../services/auth.service')

module.exports = {
  register,
  login,
  logout,
  me,
  refresh,
}

async function register(req, res) {
  const { email, password, username, firstName, lastName } = req.body
  return res.status(200).json({ message: 'TODO: register' })
}

async function login(req, res) {
  const { email, password } = req.body
  return res.status(200).json({ message: 'TODO: login', refresh: '', access: '' })
}

async function logout(req, res) {
  const { token } = req.body
  // TODO:
  return res.status(204).json()
}

async function me(req, res) {
  return res.status(200).json({ message: 'TODO: me' })
}

async function refresh(req, res) {
  const { token } = req.body
  return res.status(200).json({ message: 'TODO: refresh', refresh: '', access: '' })
}
