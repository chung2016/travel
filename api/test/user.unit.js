const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user.model');
describe('User Testing', function () {

    it('should be invalid if username is empty', function (done) {
        let user = new User();
        user.validate(function (err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });
    it('should be invalid if email is empty', function (done) {
        let user = new User();
        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid email format', function (done) {
        let user = new User({ email: 'test' });
        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        })
    })

    it('should be valid email format', function (done) {
        let user = new User({ email: 'test@example.com' });
        user.validate(function (err) {
            expect(err.errors.email).to.not.exist;
            done();
        })
    })

});