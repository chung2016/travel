# Travel Web API (v2)

## Database - Sequelize

- [migration reference](https://sequelize.org/docs/v6/other-topics/migrations/)
- initial sequelize to project `npx sequelize-cli init`
- create model example `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
- run migrate `npx sequelize-cli db:migrate`
- undo all migrate `npx sequelize-cli db:migrate:undo:all`
- undo migrate until file `npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`