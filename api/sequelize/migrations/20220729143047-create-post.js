'use strict';

const DB_CONSTRAINT = !!+process.env.DB_CONSTRAINT

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        field: 'title',
        type: Sequelize.STRING
      },
      content: {
        field: 'content',
        type: Sequelize.TEXT
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
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};