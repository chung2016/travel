# 304cem-assigment

## Frontend - Angular

- [angular-cli](https://github.com/angular/angular-cli)

### Automation Testing Dependencies
- [chai](https://github.com/chaijs/chai)
- [sinon](https://github.com/sinonjs/sinon)
- [mocha](https://github.com/mochajs/mocha)

### Automation testing

- `npm test` to run automation testing

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

#### Attractions

| HTTP Verb |            Path (URL)            |          Description           |
| --------- | -------------------------------- | ------------------------------ |
| GET       | /api/v1/attractions              | Get all attractions            |
| POST      | /api/v1/attractions              | Create attractions             |
| GET       | /api/v1/attractions/:id          | Get attractions by id          |
| PUT       | /api/v1/attractions/:id          | Update attractions by id       |
| DELETE    | /api/v1/attractions/:id          | Delete attractions by id       |
| GET       | /api/v1/attractions/user/:userid | Get all attractions by user id |

#### Favorite

| HTTP Verb |           Path (URL)           |           Description           |
| --------- | ------------------------------ | ------------------------------- |
| GET       | /api/v1/favorites              | Get all favorite favorites      |
| POST      | /api/v1/favorites              | Create favorite favorites       |
| DELETE    | /api/v1/favorites/:id          | Delete favorite favorites by id |
| GET       | /api/v1/favorites/user/:userid | Get all favorites by user id    |

#### Comments

| HTTP Verb |      Path (URL)      |     Description      |
| --------- | -------------------- | -------------------- |
| GET       | /api/v1/comments     | Get all comments     |
| POST      | /api/v1/comments     | Create comment       |
| PUT       | /api/v1/comments/:id | Update comment by id |
| DELETE    | /api/v1/comments/:id | Delete comment by id |