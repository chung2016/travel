module.exports = {
  register,
  login,
  logout,
  me,
  token,
};

function register(req, res) {
  return res.status(200).json({ message: "TODO: register" });
}
function login(req, res) {
  return res.status(200).json({ message: "TODO: login" });
}
function logout(req, res) {
  return res.status(200).json({ message: "TODO: logout" });
}
function me(req, res) {
  return res.status(200).json({ message: "TODO: me" });
}
function token(req, res) {
  return res.status(200).json({ message: "TODO: token" });
}
