'use strict'

const DB_CONSTRAINT = !!+process.env.DB_CONSTRAINT

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('oauths', {
      id: {
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      refreshToken: {
        field: 'refresh_token',
        type: Sequelize.STRING,
      },
      accessToken: {
        field: 'access_token',
        type: Sequelize.STRING,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        references: DB_CONSTRAINT && {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
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
    await queryInterface.dropTable('oauths')
  },
}
