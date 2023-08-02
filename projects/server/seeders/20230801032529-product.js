'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert('Products', [
      {
        name : 'Milk',
        price : 200,
        quantity : 10,
        isActive : true,
        productImg : '',
        categoryId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Milk',
        price : 200,
        quantity : 10,
        isActive : true,
        productImg : '',
        categoryId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
