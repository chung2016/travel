const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      'Shopping',
      'Relax',
      'Deluxe',
      'Poor Travel',
      'Photography',
      'Historical',
      'Food Hunter',
      'Whatever',
      'Tour Group',
      'Adventurer',
    ],
    required: true,
  },
  description: {
    type: String,
  },
  authorComment: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
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
  this.updatedAt = Date.now()
  next()
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Place', schema)
