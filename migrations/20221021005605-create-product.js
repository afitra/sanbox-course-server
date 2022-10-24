'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      discount: {
        type: Sequelize.INTEGER
      },
      slug: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};