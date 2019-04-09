const expect = require('chai').expect;
const sinon = require('sinon');

const Attractions = require('../../models/attractions.model');
const User = require('../../models/user.model');
const Favorite = require('../../models/favorite.model');
describe('Favorite Testing', function () {
    let stubUser = new User();
    let stubAttrations = new Attractions();

    before(function () {
        sinon.stub(stubUser, 'save');
        sinon.stub(stubAttrations, 'save');
    });

    it('should be invalid if user is empty', function (done) {
        const favorite = new Favorite({
            'attractions': stubAttrations._id
        });
        favorite.validate(function (err) {
            expect(err.errors.user).to.exist;
            done();
        });
    });

    it('should be invalid if attractions is empty', function (done) {
        const favorite = new Favorite({
            'user': stubUser._id
        });
        favorite.validate(function (err) {
            expect(err.errors.attractions).to.exist;
            done();
        });
    });

    it('should be invalid if user and attractions is empty', function (done) {
        const favorite = new Favorite();
        
        favorite.validate(function (err) {
            expect(err.errors.attractions && err.errors.user).to.exist;
            done();
        });
    });
});