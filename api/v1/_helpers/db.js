const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
})
/*
 *connect success
 */
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + process.env.MONGODB_URI)
})
/*
 *connect error
 */
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err)
})
/*
 *disconnect
 */
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

mongoose.Promise = global.Promise

module.exports = {
  User: require('../models/user.model'),
  Place: require('../models/place.model'),
  Comment: require('../models/comment.model'),
  Upload: require('../models/upload.model'),
}
