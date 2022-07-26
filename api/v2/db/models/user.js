'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Oauth)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      hooks: {
        beforeCreate(user) {
          user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR)
        },
      },
    }
  )
  return User
}
