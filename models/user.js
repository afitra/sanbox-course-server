'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bycrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeValidate(User) {
        User.password = hashPassword(User.password)
      },
      
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};