'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Trainers', [
      {
        name: 'Pradeep',
        expertise: 'Software Engineering',
        email: 'pradeep@example.com',
        phone: '9876543210',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sangeetha',
        expertise: 'Data Science',
        email: 'sangeetha@example.com',
        phone: '1122334455',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Trainers', null, {});
  }
};
