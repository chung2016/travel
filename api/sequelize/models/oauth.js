'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Oauth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
  }
  Oauth.init(
    {
      refreshToken: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      revoked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Oauth',
      underscored: true,
    }
  )
  return Oauth
}
