'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Trainees', [
      {
        name: 'Sree',
        email: 'sree@example.com',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mani',
        email: 'mani@example.com',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Trainees', null, {});
  }
};
