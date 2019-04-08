# 304cem-assigment

## Frontend - Angular

- [angular-cli](https://github.com/angular/angular-cli)

## Web API

### Dependencies

- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [body-parser](https://github.com/expressjs/body-parser)
- [chai](https://github.com/chaijs/chai)
- [cors](https://github.com/expressjs/cors)
- [express](https://github.com/expressjs/express)
- [express-jwt](https://github.com/auth0/express-jwt)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://github.com/cesanta/mongoose)
- [mocha](https://github.com/mochajs/mocha)

### common setup

- Clone this repo
- `npm install` to install all required dependencies
- Set MongoDB info `api/config.json`
- `node app.js` to start the local server

### automation testing

- `npm test` to run automation testing

This project creates the following API:

#### Users

| HTTP Verb | Path (URL)                 | Description             | Request body | Response body |
| --------- | -------------------------- | ----------------------- | ------------ | ------------- |
| POST      | /api/v1/users/authenticate | Login                   |              |               |
| POST      | /api/v1/users/register     | Register                |              |               |
| GET       | /api/v1/users              | Get all users           |              |               |
| GET       | /api/v1/users/current      | Get current logged user |              |               |
| GET       | /api/v1/users/:id          | Get user by id          |              |               |
| PUT       | /api/v1/users/:id          | Update user by id       |              |               |
| DELETE    | /api/v1/users/:id          | Delete user by id       |              |               |
