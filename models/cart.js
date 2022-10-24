'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.associate = function(models) {

    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Cart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  }
  return Cart;
};