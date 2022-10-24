'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    brand_id: DataTypes.STRING,
    category_id: DataTypes.STRING,
    description: DataTypes.TEXT,
    discount: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    stock: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};