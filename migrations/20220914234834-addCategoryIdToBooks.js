'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('Books', 'CategoryId', { type: Sequelize.INTEGER, references: {model: "Categories"} })

  },

  down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn('Books', 'CategoryId', { type: Sequelize.INTEGER, references: {model: "Categories"} })

  }
};
