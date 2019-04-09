const expect = require('chai').expect;

const User = require('../../../models/user.model');

describe('User Model Testing', function () {

	it('should be invalid if username is empty', function (done) {
		const user = new User({
			'email': 'test@example',
			'password': 'test',
		});
		user.validate(function (err) {
			expect(err.errors.username).to.exist;
			done();
		});
	});
	it('should be invalid if email is empty', function (done) {
		const user = new User({
			'username': 'test',
			'password': 'test',
		});
		user.validate(function (err) {
			expect(err.errors.email).to.exist;
			done();
		});
	});

	it('should be invalid email format', function (done) {
		const user = new User({
			'email': 'test',
			'username': 'test',
			'password': 'test'
		});
		user.validate(function (err) {
			expect(err.errors.email).to.exist;
			done();
		})
	})

	it('should be valid user', function (done) {
		const user = new User({
			'email': 'test@example.com',
			'username': 'test',
			'password': 'test',
		});
		user.validate(function (err) {
			expect(err).to.not.exist;
			done();
		})
	})

});