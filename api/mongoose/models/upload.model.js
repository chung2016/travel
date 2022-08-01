const mongoose = require('mongoose')
const path = require('path')
const Schema = mongoose.Schema
const schema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  filebase64: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

schema.pre('save', function (next) {
  const originalname = this.originalname
  const fileextension = path.extname(originalname)
  const filename = `${originalname.slice(0, originalname.length - fileextension.length)}_${
    Date.now() + fileextension
  }`
  this.filename = filename
  next()
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Upload', schema)
