# Travel Web API (v1)

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
- [file-type](https://github.com/sindresorhus/file-type)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://github.com/cesanta/mongoose)
- [multer](https://github.com/expressjs/multer)
- [path](https://github.com/jinder/path)

### This project creates the following API

- all request body must use json

#### Users

| HTTP Verb | Path (URL)                 | Description             | Request Body                                                                                           | Response Body                                                                               |
| --------- | -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| POST      | /api/v1/users/authenticate | Login                   | email: required <br> password: required                                                                | id<br>email<br>username<br>password<br>gender<br>createdAt<br>updatedAt<br>token            |
| POST      | /api/v1/users/register     | Register                | email: required<br>username: required<br>password: required<br>gender: required ["Male", "Female"]<br> | id<br>email<br>username<br>password<br>gender<br>createdAt<br>updatedAt<br>token<br>        |
| GET       | /api/v1/users              | Get all users           | null                                                                                                   | - json array<br>email:required<br>username:required<br>password:required<br>gender:required |
| GET       | /api/v1/users/current      | Get current logged user | null                                                                                                   | id<br>email<br>username<br>gender<br>createdAt<br>updatedAt                                 |
| GET       | /api/v1/users/:id          | Get user by id          | null                                                                                                   | id<br>email<br>username<br>gender<br>createdAt<br>updatedAt                                 |
| PUT       | /api/v1/users/:id          | Update user by id       | email: required<br>username: required<br>password: required<br>gender:["Male", "Female]                | id<br>email<br>username<br>gender<br>createdAt<br>updatedAt                                 |
| DELETE    | /api/v1/users/:id          | Delete user by id       | null                                                                                                   | null                                                                                        |

#### Profile

| HTTP Verb | Path(URL)           | Description      | Request Body | Response Body                                             |
| --------- | ------------------- | ---------------- | ------------ | --------------------------------------------------------- |
| GET       | /api/v1/profile/:id | Get User Profile | null         | email<br>username<br>gender<br>createdAt<br>updatedAt<br> |

#### Places

| HTTP Verb | Path (URL)                  | Description               | Request Body                                                                                                                                                                                               | Response                                                                                                                               |
| --------- | --------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| GET       | /api/v1/places              | Get all places            | null                                                                                                                                                                                                       | - json body <br>id<br>name<br>location<br>photo<br>type<br>description<br>authorComment<br>createdAt<br>updatedAt<br>author:userObject |
| GET       | /api/v1/places/:id          | Get places by id          | null                                                                                                                                                                                                       | id<br>name<br>location<br>photo<br>type<br>description<br>authorComment<br>createdAt<br>updatedAt<br>author:userObject                 |
| GET       | /api/v1/places/user/:userid | Get all places by user id | null                                                                                                                                                                                                       | id<br>name<br>location<br>photo<br>type<br>description<br>authorComment<br>createdAt<br>updatedAt<br>author:userObject                 |
| POST      | /api/v1/places              | Create places             | name:required<br>location:required<br>photo<br>type:['Shopping', 'Relax', 'Deluxe', 'Poor Travel', 'Photography', 'Historical', 'Food Hunter', 'Whatever', 'Tour Group', 'Adventurer']<br>author:required, | id<br>name<br>location<br>photo<br>type<br>description<br>authorComment<br>createdAt<br>updatedAt<br>author:userObject                 |
| PUT       | /api/v1/places/:id          | Update places by id       | name:required<br>location:required<br>photo<br>type:['Shopping', 'Relax', 'Deluxe', 'Poor Travel', 'Photography', 'Historical', 'Food Hunter', 'Whatever', 'Tour Group', 'Adventurer']<br>author:required, | id<br>name<br>location<br>photo<br>type<br>description<br>authorComment<br>createdAt<br>updatedAt<br>author:userObject                 |
| DELETE    | /api/v1/places/:id          | Delete places by id       | null                                                                                                                                                                                                       | null                                                                                                                                   |

#### Comments

| HTTP Verb | Path (URL)                      | Description             | Request Body                                               | Response Body                      |
| --------- | ------------------------------- | ----------------------- | ---------------------------------------------------------- | ---------------------------------- |
| POST      | /api/v1/comments                | Create comment          | user: required<br>message: required<br>place: required<br> | id<br>message<br>user<br>place<br> |
| DELETE    | /api/v1/comments/:id            | Delete comment by id    | null                                                       | null                               |
| GET       | /api/v1/comments/place/:placeid | Get comment by Place id | null                                                       | id<br>message<br>user<br>place<br> |

#### Upload

- `this function is using form body request`

| HTTP Verb | Path(URL)      | Description | Request Body             | Response Body |
| --------- | -------------- | ----------- | ------------------------ | ------------- |
| POST      | /api/v1/upload | Upload file | file:required, limit:5mb | file          |

### Error

- The response code may by 400, 401,422, 500
  Invalid Token example

```json
{
  "message": "Invalid Token"
}
```
