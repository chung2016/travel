# 304cem-assigment

## Frontend - Angular

### Frontend Dependencies
- [jQuery](https://github.com/jquery/jquery)
- [bootstrap4](https://github.com/twbs/bootstrap)

- [angular-cli](https://github.com/angular/angular-cli)

### Automated testing Dependencies
- [chai](https://github.com/chaijs/chai)
- [sinon](https://github.com/sinonjs/sinon)
- [mocha](https://github.com/mochajs/mocha)

### Automated testing

- `npm test` to run automated testing

### Web API Dependencies

- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [body-parser](https://github.com/expressjs/body-parser)
- [cors](https://github.com/expressjs/cors)
- [express](https://github.com/expressjs/express)
- [express-jwt](https://github.com/auth0/express-jwt)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://github.com/cesanta/mongoose)

### common setup

- Clone this repo
- `npm install` to install all required dependencies
- Set MongoDB info `api/config.json`
- `node app.js` to start the local server

This project creates the following API:

#### Users

| HTTP Verb |            Path (URL)             |               Description                |
| --------- | --------------------------------- | ---------------------------------------- |
| POST      | /api/v1/users/authenticate        | Login                                    |
| POST      | /api/v1/users/register            | Register                                 |
| GET       | /api/v1/users                     | Get all users                            |
| GET       | /api/v1/users/current             | Get current logged user                  |
| GET       | /api/v1/users/:id                 | Get user by id                           |
| PUT       | /api/v1/users/:id                 | Update user by id                        |
| DELETE    | /api/v1/users/:id                 | Delete user by id                        |

#### Places

| HTTP Verb |         Path (URL)          |        Description        |
| --------- | --------------------------- | ------------------------- |
| GET       | /api/v1/places              | Get all places            |
| POST      | /api/v1/places              | Create places             |
| GET       | /api/v1/places/:id          | Get places by id          |
| PUT       | /api/v1/places/:id          | Update places by id       |
| DELETE    | /api/v1/places/:id          | Delete places by id       |
| GET       | /api/v1/places/user/:userid | Get all places by user id |

#### Comments

| HTTP Verb |      Path (URL)      |     Description      |
| --------- | -------------------- | -------------------- |
| GET       | /api/v1/comments     | Get all comments     |
| POST      | /api/v1/comments     | Create comment       |
| PUT       | /api/v1/comments/:id | Update comment by id |
| DELETE    | /api/v1/comments/:id | Delete comment by id |