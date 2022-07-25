'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        field: 'email',
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        field: 'password',
        type: Sequelize.STRING,
      },
      username: {
        field: 'username',
        type: Sequelize.STRING,
        unique: true,
      },
      firstName: {
        field: 'first_name',
        type: Sequelize.STRING,
      },
      lastName: {
        field: 'last_name',
        type: Sequelize.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  },
}
