const expect = require('chai').expect;
const sinon = require('sinon');

const Attractions = require('../../models/attractions.model');
const User = require('../../models/user.model');

describe('Attractions Model Testing', function () {
    let stubUser = new User();
    before(function () {
        sinon.stub(stubUser, 'save');
    });

    it('should be invalid if author is empty', function (done) {
        const attractions = new Attractions({
            'location': 'test location',
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        attractions.validate(function (err) {
            expect(err.errors.author).to.exist;
            done();
        });
    });

    it('should be invalid if location is empty', function (done) {
        const attractions = new Attractions({
            'author': stubUser._id,
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        attractions.validate(function (err) {
            expect(err.errors.location).to.exist;
            done();
        });
    });

    it('should be invalid if author and location are empty', function (done) {
        const attractions = new Attractions({
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        attractions.validate(function (err) {
            expect(err.errors.author && err.errors.location).to.exist;
            done();
        });
    });

    it('should be valid attraction', function (done) {
        const attractions = new Attractions({
            'author': stubUser._id,
            'location': 'test location',
            'description': 'test description',
            'authorComment': 'test author comment',
        })
        attractions.validate(function (err) {
            expect(err).to.not.exist;
            done();
        });
    });
});