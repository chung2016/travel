const expect = require('chai').expect;
const sinon = require('sinon');

const Place = require('../../models/place.model');
const User = require('../../models/user.model');

describe('Place Model Testing', function () {
    let stubUser = new User();
    before(function () {
        sinon.stub(stubUser, 'save');
    });

    it('should be invalid if author is empty', function (done) {
        const place = new Place({
            'location': 'test location',
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        place.validate(function (err) {
            expect(err.errors.author).to.exist;
            done();
        });
    });

    it('should be invalid if location is empty', function (done) {
        const place = new Place({
            'author': stubUser._id,
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        place.validate(function (err) {
            expect(err.errors.location).to.exist;
            done();
        });
    });

    it('should be invalid if author and location are empty', function (done) {
        const place = new Place({
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        place.validate(function (err) {
            expect(err.errors.author && err.errors.location).to.exist;
            done();
        });
    });

    it('should be valid attraction', function (done) {
        const place = new Place({
            'author': stubUser._id,
            'location': 'test location',
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        place.validate(function (err) {
            expect(err).to.not.exist;
            done();
        });
    });
});