const expect = require('chai').expect;
const sinon = require('sinon');

const Place = require('../../models/place.model');
const User = require('../../models/user.model');
const Comment = require('../../models/comment.model');

describe('Comment Model Testing', function () {
    let stubUser = new User();
    let stubPlace = new Place();

    before(function () {
        sinon.stub(stubUser, 'save');
        sinon.stub(stubPlace, 'save');
    });

    it('should be invalid if user is empty', function (done) {
        const comment = new Comment({
            'place': stubPlace._id
        });
        comment.validate(function (err) {
            expect(err.errors.user).to.exist;
            done();
        });
    });

    it('should be invalid if place is empty', function (done) {
        const comment = new Comment({
            'user': stubUser._id
        });
        comment.validate(function (err) {
            expect(err.errors.place).to.exist;
            done();
        });
    });

    it('should be invalid if user and place is empty', function (done) {
        const comment = new Comment();
        
        comment.validate(function (err) {
            expect(err.errors.place && err.errors.user).to.exist;
            done();
        });
    });
});