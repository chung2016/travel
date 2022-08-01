const { expect } = require('chai')
const sinon = require('sinon')

const Place = require('../../models/place.model')
const User = require('../../models/user.model')

describe('Place Model Testing', function () {
  const stubUser = new User()
  before(function () {
    sinon.stub(stubUser, 'save')
  })

  it('should be invalid if name is empty', function (done) {
    const place = new Place({
      location: 'test location',
      description: 'test description',
      authorComment: 'test author comment',
    })
    place.validate(function (err) {
      expect(err.errors.name).to.exist
      done()
    })
  })

  it('should be invalid if location is empty', function (done) {
    const place = new Place({
      author: stubUser._id,
      description: 'test description',
      authorComment: 'test author comment',
    })
    place.validate(function (err) {
      expect(err.errors.location).to.exist
      done()
    })
  })

  it('should be invalid if name and location are empty', function (done) {
    const place = new Place({
      description: 'test description',
      authorComment: 'test author comment',
    })
    place.validate(function (err) {
      expect(err.errors.name && err.errors.location).to.exist
      done()
    })
  })

  it('should be valid place', function (done) {
    const place = new Place({
      author: stubUser._id,
      name: 'test name',
      location: 'test location',
      description: 'test description',
      type: 'Shopping',
      authorComment: 'test author comment',
    })
    place.validate(function (err) {
      console.log(err)
      expect(err).to.not.exist
      done()
    })
  })
})
