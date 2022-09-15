'use strict';
const fs = require ('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const profiles = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8')).map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date
      }
    })
    return queryInterface.bulkInsert('Profiles', profiles)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles')
  }
};
