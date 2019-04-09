const expect = require('chai').expect;
const sinon = require('sinon');

const Attractions = require('../../models/attractions.model');
const User = require('../../models/user.model');
const Comment = require('../../models/comment.model');
describe('Comment Testing', function () {
    let stubUser = new User();
    let stubAttrations = new Attractions();

    before(function () {
        sinon.stub(stubUser, 'save');
        sinon.stub(stubAttrations, 'save');
    });

    it('should be invalid if user is empty', function (done) {
        const comment = new Comment({
            'attractions': stubAttrations._id
        });
        comment.validate(function (err) {
            expect(err.errors.user).to.exist;
            done();
        });
    });

    it('should be invalid if attractions is empty', function (done) {
        const comment = new Comment({
            'user': stubUser._id
        });
        comment.validate(function (err) {
            expect(err.errors.attractions).to.exist;
            done();
        });
    });

    it('should be invalid if user and attractions is empty', function (done) {
        const comment = new Comment();
        
        comment.validate(function (err) {
            expect(err.errors.attractions && err.errors.user).to.exist;
            done();
        });
    });
});