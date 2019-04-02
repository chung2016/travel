# 304cem-assigment

## Web API

This project creates the following API:

### Users

| HTTP Verb | Path (URL)                 | Description             | Request body | Response body |
| --------- | -------------------------- | ----------------------- | ------------ | ------------- |
| POST      | /api/v1/users/authenticate | Login                   |              |               |
| POST      | /api/v1/users/register     | Register                |              |               |
| GET       | /api/v1/users              | Get all users           |              |               |
| GET       | /api/v1/users/current      | Get current logged user |              |               |
| GET       | /api/v1/users/:id          | Get user by id          |              |               |
| PUT       | /api/v1/users/:id          | Update user by id       |              |               |
| DELETE    | /api/v1/users/:id          | Delete user by id       |              |               |
