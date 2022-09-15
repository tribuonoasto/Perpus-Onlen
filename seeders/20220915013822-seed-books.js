'use strict';
const fs = require ('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const books = JSON.parse(fs.readFileSync('./data/books.json', 'utf-8')).map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date
      }
    })
    return queryInterface.bulkInsert('Books', books)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Books')
  }
};
