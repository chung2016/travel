module.exports = validate

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    })
    if (error) {
      const messages = error.details
        .map(({ message }) => message)
        .reduce((prev, curr) => prev + curr + '\n', '')
      return res.status(422).json({ messages })
    }
    next()
  }
}
